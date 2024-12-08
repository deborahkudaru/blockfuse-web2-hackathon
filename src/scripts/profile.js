// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import {
//     getAuth,
//     onAuthStateChanged,
//     signOut
// } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import {
//     getFirestore,
//     getDoc,
//     doc,
// } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCpRPaP1wVEaG4ewVPSLzpP26i9luJjMRQ",
//     authDomain: "blockfuse-fitness-app.firebaseapp.com",
//     projectId: "blockfuse-fitness-app",
//     storageBucket: "blockfuse-fitness-app.firebasestorage.app",
//     messagingSenderId: "156943944482",
//     appId: "1:156943944482:web:d9fe2c9c7eb742ddff337b"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);


// function capitalizeName(name) {
//     return name
//         .split(" ")
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
//         .join(" "); 
// }

// // Handle user session and fetch user data
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const docRef = doc(db, "users", user.uid);
//         getDoc(docRef).then((docSnap) => {
//             if (docSnap.exists()) {
//                 const userData = docSnap.data();
//                 document.querySelector("#full-name").innerText =capitalizeName(userData.fullName);
//                 document.querySelector("#bmi").innerText = userData.weight/userData.height**2
//             } else {
//                 console.error("No document found matching the user's ID");
//             }
//         }).catch((error) => {
//             console.error("Error fetching user data:", error);
//         });
//     } else {
//         console.log("No user is logged in, redirecting to login...");
//         window.location.href = "../index.html";
//     }
// });

// // Logout functionality
// const logoutBtn = document.querySelector("#log-out");

// logoutBtn.addEventListener("click", () => {
//     signOut(auth).then(() => {
//         console.log("User successfully signed out");
//         window.location.href = "../index.html";
//     }).catch((error) => {
//         console.error("Error signing out:", error);
//     });
// });




import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// Capitalize name function
function capitalizeName(name) {
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" "); 
}

// Function to fetch and render the calendar
function fetchAndRenderCalendar(loginDates) {
    const calendarContainer = document.querySelector("#calendar");
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    calendarContainer.innerHTML = "";

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");
        dayElement.innerText = day;

       
        if (loginDates.includes(date)) {
            dayElement.classList.add("logged-in");
        }

        calendarContainer.appendChild(dayElement);
    }
}

// fetch user data from databse
onAuthStateChanged(auth, (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.querySelector("#full-name").innerText = capitalizeName(userData.fullName);
                document.querySelector("#bmi").innerText = userData.weight / userData.height ** 2;

             
                if (userData.loginDates) {
                    fetchAndRenderCalendar(userData.loginDates);
                }
            } else {
                console.error("No document found matching the user's ID");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        console.log("No user is logged in, redirecting to login...");
        window.location.href = "../index.html";
    }
});

// Logout functionality
const logoutBtn = document.querySelector("#log-out");

logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("User successfully signed out");
        window.location.href = "../index.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});



// to get current date
const today = new Date();


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentDay = days[today.getDay()];

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);

let todaysDate = document.querySelector("#todays-date")

todaysDate.innerText = `${formattedDate}, ${currentDay}`




// for timer
let secondsElapsed = 0;
let timerInterval;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");

function updateTimerDisplay() {
  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  timerElement.textContent = 
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startCountUp() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      secondsElapsed++;
      updateTimerDisplay();
    }, 1000);
  }
}

function stopCountUp() {
  clearInterval(timerInterval);
  timerInterval = null;
}

startButton.addEventListener("click", startCountUp);
stopButton.addEventListener("click", stopCountUp);