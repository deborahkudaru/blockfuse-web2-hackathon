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
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
    getFirestore,
    setDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

let submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submitBtn.textContent = "Signing up...";
    submitBtn.disabled = true;

    let fullName = document.querySelector("#full-name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    const auth = getAuth(app);
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                fullName: fullName,
            };
            console.log("User has been created");

            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {

                    window.location.href = "./welcome.html";
                })
                .catch((err) => {
                    console.error("Error writing document", err);

                    // Revert button text and re-enable the button
                    submitBtn.textContent = "Sign Up";
                    submitBtn.disabled = false;
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode);

            submitBtn.textContent = "Sign Up";
            submitBtn.disabled = false;
        });
});

