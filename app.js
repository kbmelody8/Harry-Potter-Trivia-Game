// Get references to the categories list and play button
const ul = document.getElementById("categories");
const btnPlay = document.getElementById("play");

// Add event listener for the play button
btnPlay.addEventListener("click", (e) => {
    // Get all the categories names from the list
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
            return;//Don't do anything if  ID "error" already exists as the error message has been displayed before
        }
        //If no category is selected, create a new "p" element
        const span = document.createElement("p");
        span.textContent = "Please choose a category";
        span.className = "error";
        //The after() method inserts "p" "after the "Play" button in HTML
        btnPlay.after(span);//https://www.w3schools.com/jquery/html_after.asp
        span.id = "error";
        return;
    }
    // Redirect to the selected category's HTML page 
    //https://www.w3schools.com/js/js_window_location.asp
    window.location.assign(`${active}.html`)
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

    
    document.getElementById("playPauseBtn").addEventListener("click", toggleAudio);
    document.getElementById("muteBtn").addEventListener("click", toggleMute);
    document.getElementById("volumeUpBtn").addEventListener("click", volumeUp);
    document.getElementById("volumeDownBtn").addEventListener("click", volumeDown);

    function toggleAudio() {
        const audio = document.getElementById("myAudio");
        const audioButton = document.getElementById("playPauseBtn");

        if (audio.paused) {
            audio.play();
            audioButton.textContent = "⏸";
        } else {
            audio.pause();
            audioButton.textContent = "▶️";
        }
    }

    function toggleMute() {
        const audio = document.getElementById("myAudio");
        const button = document.getElementById("muteBtn");
    
        if (audio.muted) {
            audio.muted = false;
            audioButton.textContent = "🔊";
        } else {
            audio.muted = true;
            audioButton.textContent = "🔇";
        }
    }
    function volumeUp() {
    let audio = document.getElementById("myAudio");
        audio.volume = Math.min(1, audio.volume + 0.1); 
    }
    
    function volumeDown() {
        let audio = document.getElementById("myAudio");
        audio.volume = Math.max(0, audio.volume - 0.1); 
    }