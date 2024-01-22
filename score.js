// Retrieve the 'score' value from the localStorage
////https://www.w3schools.com/jsref/prop_win_localstorage.asp
const score = localStorage.getItem("score");

// Find the HTML element with the class 'score'
const scoreFind = document.querySelector(".score");

// Create a new paragraph element
const text = document.createElement("p");

// Set the text content of the paragraph to display the final score
text.textContent = `Final score is ${score}`;

// Set the class name of the paragraph to 'score-text'
text.className = "score-text";

// Append the paragraph element to the HTML element with class 'score'
scoreFind.appendChild(text);
