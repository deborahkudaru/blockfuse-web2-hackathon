
// bmi calculation of weigth and 

function calculateBMI(weight, height) {
   if (!isValidInput(weight, height)) {
       return null;
   }

   const bmi = weight / Math.pow(height, 2);
   return bmi.toFixed(1);
}

/**
* Validates that weight and height inputs are valid numbers greater than 0
*/
function isValidInput(weight, height) {
   if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
       displayError("Please enter valid weight and height values.");
       return false;
   }
   return true;
}

/**
* Takes a BMI value and returns the corresponding category
* Also displays appropriate alert to user
*/
function getBMICategory(bmi) {
   const categories = {
       underweight: { max: 18.5, alert: "You are underweight." },
       normal: { max: 24.9, alert: "You have a normal weight." },
       overweight: { max: 29.9, alert: "You are overweight." },
       obese: { alert: "You are obese." }
   };

   for (const [category, { max, alert }] of Object.entries(categories)) {
       if (!max || bmi < max) {
           displayMessage(alert);
           return category.charAt(0).toUpperCase() + category.slice(1);
       }
   }
}

/**
* Displays error message to user
*/
function displayError(message) {
   alert(message);
}

/**
* Displays informational message to user
*/
function displayMessage(message) {
   alert(message); 
}

// Event listener for form submission
document.getElementById('bmiForm').addEventListener('submit', (event) => {
   event.preventDefault();

   const weight = parseFloat(document.getElementById('weight').value);
   const height = parseFloat(document.getElementById('height').value);

   const bmi = calculateBMI(weight, height);
   if (bmi) {
       const category = getBMICategory(bmi);
       document.getElementById('result').innerHTML = `BMI: ${bmi}, Category: ${category}`;
   }
});