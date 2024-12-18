/* jshint esversion: 6 */

/* Tracks if game has started */
let gameStarted = false;

/* List of items used in the game */
const items = [
    "apple",
    "banana",
    "strawberry",
    "pear",
    "orange",
    "pineapple",
    "coconut",
    "grapes",
    "lemon"
];

/* arrays to store sequences */
let gameSequence = [];
let userSequence = [];

/* Current score of player and high score from local storage */
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

/* Dom Ready Function and elements */
document.addEventListener("DOMContentLoaded", function() {
    const itemGrid = document.getElementById("item-grid");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const highScoreDisplay = document.getElementById("high-score");
    const modal = document.getElementById("instruction-modal");
    const closeButton = document.querySelector(".close-button");

    /* Update high score display */
    if (highScoreDisplay) {
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
    
    /* Populate grid with item images with event listeners */
    items.forEach(function(item) {
        const img = document.createElement("img");
        img.src = `assets/images/${item}.png`;
        img.alt = item;
        img.id = item;

        img.addEventListener("click", () => handleItemClick(item, img));
        itemGrid.appendChild(img);
    });

    /* EVent listeners to start and reset the game */
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);

    /* Display and close modal with instructions */
    modal.style.display = "block";

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    /* Update year in footer */
    updateFooterYear();
});

/* Start game function*/
function startGame() {
    gameStarted = true;
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const sequenceCounter = document.getElementById("sequence-counter");
    startButton.style.display = "none";
    resetButton.style.display = "block";
    gameSequence = [];
    userSequence = [];
    score = 0;
    sequenceCounter.textContent = "Sequence Length: 0";
    addRandomItemToSequence();

    const clickedSequenceBox = document.getElementById("clicked-sequence");
    clickedSequenceBox.innerHTML = " ";
}

/* Reset game function */
function resetGame() {
    gameStarted = false;
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const currentItemBox = document.getElementById("current-item");
    const sequenceCounter = document.getElementById("sequence-counter");

    gameSequence = [];
    userSequence = [];
    score = 0;
    sequenceCounter.textContent = "Sequence Length: 0";
    currentItemBox.innerHTML = " ";
    startButton.style.display = "block";
    resetButton.style.display = "none";

    const clickedSequenceBox = document.getElementById("clicked-sequence");
    clickedSequenceBox.innerHTML = " ";
}

/* Add random item to sequence funtion */
function addRandomItemToSequence() {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    gameSequence.push(randomItem);
    displayItem(randomItem);
    updateCounter();
    userSequence = [];
}

/* Show current item in game */
function displayItem(item) {
    const currentItemBox = document.getElementById("current-item");
    currentItemBox.innerHTML = `
        <img src="assets/images/${item}.png"
            alt="${item}">`;
}

/* Update counter with current sequence length */
function updateCounter() {
    const sequenceCounter = document.getElementById("sequence-counter");
    sequenceCounter.textContent = `Sequence Length: ${gameSequence.length}`;
}

/* Handle user click on item image */
function handleItemClick(item) {
    if (!gameStarted) {
        return;
    }
    const clickedSequenceBox = document.getElementById("clicked-sequence");

    const img = document.createElement("img");
    img.src = `assets/images/${item}.png`;
    img.alt = item;
    clickedSequenceBox.appendChild(img);

    userSequence.push(item);
    if (!checkUserSequence()) {
        alert(`
            Game Over! Your list contains
                ${gameSequence.length - 1} items.`);
        updateHighScore();
        resetGame();
    } else if (userSequence.length === gameSequence.length) {
        setTimeout(function() {
            clickedSequenceBox.innerHTML = "";
            score++;
            setTimeout(addRandomItemToSequence, 1000);
        }, 500);
    }
}

/* CHeck if user sequence matches game sequence */
function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

/* Update high score */
function updateHighScore() {
    const highScoreDisplay = document.getElementById("high-score");

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

/* Update footer year */
function updateFooterYear() {
    const yearSpan = document.getElementById("current-year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}