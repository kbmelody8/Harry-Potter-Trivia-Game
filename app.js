// Get references to the categories list and play button
const ul = document.getElementById("categories");
const btnPlay = document.getElementById("play");

// Add event listener for the play button
btnPlay.addEventListener("click", (e) => {
// Get all items from category list
const listItems = document.querySelectorAll("#categories li");
let active = null;
console.log(listItems);

// Iterate through each category to find the active one
listItems.forEach(item => {
    if (item.classList.contains("categories-active")) {
        active = item.id;
    }
});

// Display alert if no category is selected
    if (!active) {
        alert("Please choose a category");
        return;
    }
// Log active category to the console
console.log(active);
});

// Add event listener for the categories list
ul.addEventListener("click", (e) => {
    const target = e.target;
    // Find currently active category
    const active = target.closest("ul").querySelector(".categories-active");
    // Remove the active class from the current category
    if (active) {
        active.classList.remove("categories-active");
    }
    // Add the active class to the clicked category
target.classList.add("categories-active");
});
