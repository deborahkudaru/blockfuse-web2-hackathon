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



import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// Get Firestore instance
const db = getFirestore();

// Get the user ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("uid");

// Reference the form and button
const additionalInfoForm = document.querySelector("#form-item");
const submitInfoBtn = document.querySelector("#info-btn");

// Handle form submission
additionalInfoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitInfoBtn.textContent = "Submitting...";
    submitInfoBtn.disabled = true;

    // Get height and weight input values
    const height = document.querySelector("#height").value;
    const weight = document.querySelector("#weight").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;

    // Reference the user's Firestore document
    const userDocRef = doc(db, "users", userId);

    try {
        // Update the Firestore document with height and weight
        await updateDoc(userDocRef, {
            height: parseInt(height),
            weight: parseInt(weight),
            age: parseInt(age),
            gender: gender,
        });

        console.log("Additional info added successfully");
        // alert("Your additional information has been saved!");

        // Redirect to another page, e.g., profile or dashboard
        window.location.href = "./profile.html";
    } catch (err) {
        console.error("Error updating additional info:", err);
        // alert("An error occurred while saving your information. Please try again.");
        submitInfoBtn.textContent = "Submit";
        submitInfoBtn.disabled = false;
    }
});
