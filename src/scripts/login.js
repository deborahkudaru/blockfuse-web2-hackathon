// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpRPaP1wVEaG4ewVPSLzpP26i9luJjMRQ",
    authDomain: "blockfuse-fitness-app.firebaseapp.com",
    projectId: "blockfuse-fitness-app",
    storageBucket: "blockfuse-fitness-app.firebasestorage.app",
    messagingSenderId: "156943944482",
    appId: "1:156943944482:web:d9fe2c9c7eb742ddff337b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
    getFirestore,
    updateDoc,
    doc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

let loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    const auth = getAuth(app);
    const db = getFirestore();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login successfully");

            // Add today's date to the loginDates array in Firestore
            const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
            const docRef = doc(db, "users", user.uid);
            updateDoc(docRef, {
                loginDates: arrayUnion(today) // Add today's date if not already present
            })
                .then(() => {
                    console.log("Login date updated successfully in Firestore");
                })
                .catch((error) => {
                    console.error("Error updating login date:", error);
                });

            // Redirect to the profile page
            window.location.href = "./profile.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorMessage, errorCode);

            loginBtn.textContent = "Login";
            loginBtn.disabled = false;
        });
});
