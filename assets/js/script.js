const items = [
    'apple',
    'banana',
    'strawberry',
    'pear',
    'orange',
    'pineapple',
    'coconut',
    'grapes',
    'lemon'
];

let gameSequence = [];
let userSequence = [];
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const itemGrid = document.getElementById('item-grid');
    const currentItemBox = document.getElementById('current-item');
    const sequenceCounter = document.getElementById('sequence-counter');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');

    items.forEach(item => {
        const img = document.createElement('img');
        img.src = `assets/images/${item}.png`;
        img.alt = item;
        img.id = item;
        img.addEventListener('click', () => handleItemClick(item));
        itemGrid.appendChild(img);
    });

    startButton.addEventListener('click', startGame);

    resetButton.addEventListener('click', resetGame);

    function startGame() {
        startButton.style.display = 'none';
        resetButton.style.display = 'block';
        gameSequence = [];
        userSequence = [];
        score = 0;
        sequenceCounter.textContent = 'Sequence Length: 0';
        addRandomItemToSequence();
    }

    function resetGame() {
        gameSequence = [];
        userSequence = [];
        score = 0;
        sequenceCounter.textContent = 'Sequence Length: 0';
        currentItemBox.innerHTML = '';
        startButton.style.display = 'block';
        resetButton.style.display = 'none';
    }

    function addRandomItemToSequence() {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        gameSequence.push(randomItem);
        displayItem(randomItem);
        updateCounter();
        userSequence = [];
    }

    function displayItem(item) {
        currentItemBox.innerHTML = `<img src="assets/images/${item}.png" alt="${item}">`
    }

    function updateCounter() {
        sequenceCounter.textContent = `Sequence Length: ${gameSequence.length}`;
    }

    function handleItemClick(item) {
        userSequence.push(item);
        if (!checkUserSequence()) {
            alert(`Game Over! Your list contains ${gameSequence.length - 1} items.`);
            resetGame();
        } else if (userSequence.length === gameSequence.length) {
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

})