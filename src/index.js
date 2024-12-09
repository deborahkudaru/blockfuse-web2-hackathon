document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("typing-container");
    const words = ["FitZen", "Eat Healthy!", "Stay Fit!", "Transform Your Habits.", "Transform Your Life."];
    const typingSpeed = 100;
    const delayBetweenWords = 1000;

    let wordIndex = 0;
    let charIndex = 0;

    function typeWord() {
        if (charIndex < words[wordIndex].length) {
            container.textContent += words[wordIndex][charIndex];
            charIndex++;
            setTimeout(typeWord, typingSpeed);
        } else {
            setTimeout(clearWord, delayBetweenWords);
        }
    }

    function clearWord() {
        if (charIndex > 0) {
            container.textContent = words[wordIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(clearWord, typingSpeed / 2);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWord, typingSpeed);
        }
    }

    typeWord();
});


// toggel menue
let menuBtn = document.getElementById("menu-btn")
let closeBtn = document.getElementById("close-btn")


menuBtn.addEventListener("click", () => {
    document.getElementById("phone-view").style.display = "flex"
    menuBtn.style.display = "none";
    closeBtn.style.display = "block"

})



closeBtn.addEventListener("click", () => {
    document.getElementById("phone-view").style.display = "none"
    closeBtn.style.display = "none";
    menuBtn.style.display = "block"
})

document.getElementById('messageForm').addEventListener('submit', async function (e) {
    e.preventDefault(); 

        const email = document.getElementById("email")
        const sendMessage = document.getElementById("message")
    try {
      const response = await fetch('http://localhost:3000/api/user/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, sendMessage }),
      });
        // sendMessage.innerText =""
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }
  
      const data = await response.json();
      alert(`message sent`);
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  

  });