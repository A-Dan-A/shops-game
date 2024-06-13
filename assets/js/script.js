const fruits = [
    'apple',
    'banana',
    'strawberry',
    'pear',
    'orange',
    'pineapple',
    'coconut',
    'grapes',
    'lemon'
]

let gameSequence = [];
let usersequence = [];
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const itemGrid = document.getElementById('item-grid');
    const currentItemBox = document.getElementById('current-item');
    const sequenceCounter = document.getElementById('sequence-counter');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button')

    items.forEach(item => {
        const img = document.createElement('img');
        img.src = `images/${item}.png`;
        img.alt = item;
        img.id = item;
        img.addEventListener('click', () => handleItemClick(item));
        itemGrid.appendChild(img);
    })

})