// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


let loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Login successfully');
            const user = userCredential.user;
            localStorage.setItem("loggedInUserId", user.uid);

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
