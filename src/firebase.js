// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAznoagYilJqs8B2CHZhPNA9yjpQAmT548",
    authDomain: "blockfuse-hackathon-239f1.firebaseapp.com",
    projectId: "blockfuse-hackathon-239f1",
    storageBucket: "blockfuse-hackathon-239f1.firebasestorage.app",
    messagingSenderId: "471436298635",
    appId: "1:471436298635:web:590f302d81ae16b8bb078e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;