/*jshint esversion: 6 */
/*jslint es6 */

let gameStarted = false;

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

let gameSequence = [];
let userSequence = [];
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.addEventListener("DOMContentLoaded", function () {
    const itemGrid = document.getElementById("item-grid");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const highScoreDisplay = document.getElementById("high-score");
    const modal = document.getElementById("instruction-modal");
    const closeButton = document.querySelector(".close-button");

    highScoreDisplay.textContent = `High Score: ${highScore}`;

    items.forEach( function (item) {
        const img = document.createElement("img");
        img.src = `assets/images/${item}.png`;
        img.alt = item;
        img.id = item;
        img.addEventListener("click", () => handleItemClick(item));
        itemGrid.appendChild(img);
    });

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);

    modal.style.display = "block";

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    updateFooterYear();
});

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
}

function resetGame() {
    gamestarted = false;
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
}

function addRandomItemToSequence() {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    gameSequence.push(randomItem);
    displayItem(randomItem);
    updateCounter();
    userSequence = [];
}

function displayItem(item) {
    const currentItemBox = document.getElementById("current-item");
    currentItemBox.innerHTML = `
        <img src="assets/images/${item}.png"
            alt="${item}">`;
}

function updateCounter() {
    const sequenceCounter = document.getElementById("sequence-counter");
    sequenceCounter.textContent = `Sequence Length: ${gameSequence.length}`;
}

function handleItemClick(item) {
    if (!gameStarted) return;
    
    userSequence.push(item);
    if (!checkUserSequence()) {
        alert(`
            Game Over! Your list contains
                ${gameSequence.length - 1} items.`);
        updateHighScore();
        resetGame();
    } else if (userSequence.length === gameSequence.length) {
        score++;
        setTimeout(addRandomItemToSequence, 1000);
    }
}

function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

function updateHighScore() {
    const highScoreDisplay = document.getElementById("high-score");

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

function updateFooterYear() {
    const yearSpan = document.getElementById("current-year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}