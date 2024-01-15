// Define questions for different categories
const questions = {
    "houses": [{
        question: "Which house values bravery and courage?",
        options: ["a) Hufflepuff", "b) Ravenclaw", "c) Slytherin", "d) Gryffindor"],
        answer: "d) Gryffindor",
        id: "houses",
        points: 1,
        bonusPoints: 2,
        //will add more houses-related questions here
    }],
    "characters": [{
        // will add character-related questions here
    }],
    "spells": [{
        // will add spell-related questions here
    }],
    "random": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
}

// Get references to the categories list and play button
const ul = document.getElementById("categories");
const btnPlay = document.getElementById("play");

// Add event listener for the play button
btnPlay.addEventListener("click", (e) => {
    // Get all items from the category list
    const listItems = document.querySelectorAll("#categories li");
    let active = null;
    console.log(listItems);

    // Iterate through each category to find the active one
    listItems.forEach(item => {
        if (item.classList.contains("categories-active")) {
            active = item.id;
        }
    });

    // Display an alert if no category is selected
    if (!active) {
        const error = document.querySelector("#error");
        if (error) {
            return;
        }
        const span = document.createElement("p");
        span.textContent = "Please choose a category";
        span.className = "error";
        btnPlay.after(span);
        span.id = "error";
        return;
    }
});

// Add event listener for the categories list
ul.addEventListener("click", (e) => {
    const target = e.target;
    const error = document.getElementById("error");
    if (error) {
        error.remove();
    }
    // Find the currently active category
    const active = target.closest("ul").querySelector(".categories-active");
    // Remove the active class from the current category
    if (active) {
        active.classList.remove("categories-active");
    }
    // Add the active class to the clicked category
    target.classList.add("categories-active");
});

// Function to randomize questions for a given category
function randomizeQuestions(category) {
    const questionCategory = questions[category];
    if (!questionCategory.length) {
        return "There are no more questions left";
    }
    let randomIndex = Math.floor(Math.random() * questionCategory.length);
    let randomElement = questionCategory[randomIndex];
    questions[category] = questionCategory.splice(randomIndex, 1);
    return randomElement;
}

// Example usage of randomizeQuestions for "random" category
randomizeQuestions("random");

// Function to render a question in the specified category
function renderQuestion(category) {
    const question = randomizeQuestions(category);
    const questionParent = document.getElementById("question");
    questionParent.innerText = "";
    questionParent.insertAdjacentHTML("beforeend", `<div id=${question.id}>
        <h2>${question.question}</h2>
        <ul>${question.options.map(item => (`<li id=${item}>${item}</li>`))}</ul>
    </div>`);
    const answer = document.getElementById(question.id);
    answer.addEventListener("click", handleAnswer);
}

// Function to handle the selected answer
function handleAnswer() {
    // implement the logic to handle the selected answer
    // thinking  of how I can update scores, show correct/incorrect messages and etc.
}
