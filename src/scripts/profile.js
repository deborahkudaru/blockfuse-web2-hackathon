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
    updateDoc,
    increment,
    arrayUnion
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
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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

// function renderLoggedTimes(loggedTimes) {
//     const logContainer = document.querySelector("#log-container");
//     logContainer.innerHTML = "<p class='log-heading'>Logged Times. Target: 9000 seconds</p>";

//     let totalSeconds = 0;

//     loggedTimes.forEach(log => {
//         const logElement = document.createElement("p");
//         logElement.textContent = `${log.time} seconds on ${log.date}`;
//         logContainer.appendChild(logElement)
//         totalSeconds += log.time;
//     });

//     const totalElement = document.createElement("p");
//     totalElement.classList.add("total-seconds");
//     totalElement.textContent = `Total: ${totalSeconds} seconds`;
//     logContainer.appendChild(totalElement);
// }

function renderLoggedTimes(loggedTimes) {
    const logContainer = document.querySelector("#log-container");
    logContainer.innerHTML = "<p class='log-heading'>Logged Times. Target: 9000 seconds</p>";

    let totalSeconds = 0;

    loggedTimes.forEach(log => {
        const logElement = document.createElement("p");
        logElement.textContent = `${log.time} seconds on ${log.date}`;
        logContainer.appendChild(logElement);
        totalSeconds += log.time;
    });

    const progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("progress-bar-container");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    const progressPercentage = Math.min((totalSeconds / 9000) * 100, 100);
    progressBar.style.width = `${progressPercentage}%`;

    progressBarContainer.appendChild(progressBar);
    logContainer.appendChild(progressBarContainer);

    const totalElement = document.createElement("p");
    totalElement.classList.add("total-seconds");
    totalElement.textContent = `Total: ${totalSeconds} seconds`;
    logContainer.appendChild(totalElement);
}



// Fetch user data from database
onAuthStateChanged(auth, (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.querySelector("#full-name").innerText = capitalizeName(userData.fullName);
                document.querySelector("#bmi").innerText = (userData.weight / userData.height ** 2).toFixed(2);

                if (userData.loginDates) {
                    fetchAndRenderCalendar(userData.loginDates);
                }

                if (userData.loggedTimes) {
                    renderLoggedTimes(userData.loggedTimes);
                }
            } else {
                console.error("No document found matching the user's ID");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        console.log("No user is logged in, redirecting to login...");
        window.location.href = "../../index.html";
    }
});

// Logout functionality
const logoutBtn = document.querySelector("#log-out");

logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("User successfully signed out");
        window.location.href = "../../index.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});

// To display current date with day
const today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[today.getDay()];
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerText = `${formattedDate}, ${currentDay}`;

// Timer functionality
let secondsElapsed = 0;
let timerInterval;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");
const logTimeButton = document.getElementById("log-time-btn");

function updateTimerDisplay() {
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;

    timerElement.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

function resetTimer() {
    stopCountUp();
    secondsElapsed = 0;
    updateTimerDisplay();
}

function logTime() {
    const user = auth.currentUser;
    if (user) {
        const currentDate = today.toISOString().split("T")[0];
        const userDocRef = doc(db, "users", user.uid);
        const logEntry = { time: secondsElapsed, date: currentDate };

        updateDoc(userDocRef, {
            loggedTimes: arrayUnion(logEntry),
            timeLogged: increment(secondsElapsed)
        })
            .then(() => {
                console.log("Time logged successfully:", logEntry);
                secondsElapsed = 0;
                updateTimerDisplay();

                // Fetch and render the updated log
                getDoc(userDocRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        renderLoggedTimes(userData.loggedTimes || []);
                    }
                });
            })
            .catch((error) => {
                console.error("Error logging time to Firebase:", error);
            });
    }
}

// Event Listeners for Timer Buttons
startButton.addEventListener("click", startCountUp);
stopButton.addEventListener("click", stopCountUp);
resetButton.addEventListener("click", resetTimer);
logTimeButton.addEventListener("click", logTime);


// toggle menue
let menuBtn = document.getElementById("menu-btn")
let closeBtn = document.getElementById("close-btn")


menuBtn.addEventListener("click", () => {
    document.getElementById("phone").style.display = "flex"
    menuBtn.style.display = "none";
    closeBtn.style.display = "block"

})



closeBtn.addEventListener("click", () => {
    document.getElementById("phone").style.display = "none"
    closeBtn.style.display = "none";
    menuBtn.style.display = "block"
})



