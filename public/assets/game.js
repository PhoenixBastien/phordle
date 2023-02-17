import { dictionary } from './dictionary.js'

const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5). fill('')),
    currentRow: 0,
    currentCol: 0
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function updateGrid() {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
            if (state.currentRow === i) {
                if (box.textContent !== '') {
                    box.classList.add('filled');
                } else {
                    box.classList.remove('filled');
                }
            }
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.textContent = letter;
    box.id = `box${row}${col}`;
    container.appendChild(box);
    return box;
}

function drawKeyboard(container) {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    
    // first row
    const row1 = document.createElement('div');
    row1.className = 'row';

    const lettersRow1 = 'qwertyuiop';
    for (let i = 0; i < lettersRow1.length; i++) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = lettersRow1.charAt(i);
        button.id = button.textContent;
        row1.appendChild(button);
    }

    keyboard.appendChild(row1);

    // second row
    const row2 = document.createElement('div');
    row2.className = 'row';

    const lettersRow2 = 'asdfghjkl';
    for (let i = 0; i < lettersRow2.length; i++) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = lettersRow2.charAt(i);
        button.id = button.textContent;
        row2.appendChild(button);
    }

    keyboard.appendChild(row2);

    // third row
    const row3 = document.createElement('div');
    row3.className = 'row';

    // enter key
    const enter = document.createElement('button');
    enter.className = 'enter';
    enter.textContent = '⏎';
    row3.appendChild(enter);

    const lettersRow3 = 'zxcvbnm';
    for (let i = 0; i < lettersRow3.length; i++) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = lettersRow3.charAt(i);
        button.id = button.textContent;
        row3.appendChild(button);
    }
    
    // backspace key
    const backspace = document.createElement('button');
    backspace.className = 'backspace';
    backspace.textContent = '⌫';
    row3.appendChild(backspace);

    keyboard.appendChild(row3);
    container.appendChild(keyboard);
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isValid(word) {
    return dictionary.includes(word.toLowerCase());
}

function getLetterCount(word, letter) {
    const regex = RegExp(`${letter.toLowerCase()}`, 'g');
    return (word.toLowerCase().match(regex) || '').length;
}

function getLetterPosition(word, letter, position) {
    let result = 0;
    for (let i = 0; i <= position; i++) {
        if (word[i].toLowerCase() === letter.toLowerCase()) {
            result++;
        }
    }
    return result;
}

function reveal(guess) {
    const row = state.currentRow;
    const animationDuration = 500;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent.toLowerCase();
        const key = document.getElementById(letter);

        const letterCountSecret = getLetterCount(state.secret, letter);
        const letterCountGuess = getLetterCount(guess, letter);
        const letterPosition = getLetterPosition(guess, letter, i);
        
        setTimeout(() => {
            if (letterCountGuess > letterCountSecret
                && letterPosition > letterCountSecret) {
                    box.classList.replace('filled', 'wrong');
                    key.classList.add('wrong');
            } else {
                if (letter === state.secret[i]) {
                    box.classList.replace('filled', 'right-position');
                    key.classList.add('right-position');
                } else if (state.secret.includes(letter)) {
                    box.classList.replace('filled', 'wrong-position');
                    key.classList.add('wrong-position');
                } else {
                    box.classList.replace('filled', 'wrong');
                    key.classList.add('wrong');
                }
            }
        }, ((i + 1) * animationDuration) / 2);

        box.classList.add('flipped');
        box.style.animationDelay = `${(i * animationDuration) / 2}ms`;
    }

    const isWinner = state.secret === guess.toLowerCase();
    const isLoser = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            switch (state.currentRow) {
                case 1:
                    popup('Genius');
                    break;
                case 2:
                    popup('Magnificent');
                    break;
                case 3:
                    popup('Impressive');
                    break;
                case 4:
                    popup('Splendid');
                    break;
                case 5:
                    popup('Great');
                    break;
                case 6:
                    popup('Phew');
                    break;
            }
            Object.freeze(state);
            bounceRow();
        } else if (isLoser) {
            popup(state.secret.toUpperCase());
            Object.freeze(state);
        }
    }, 3 * animationDuration);
}

function isLetter(key) {
    return key.length === 1 && key.toLowerCase().match(/[a-z]/i);
}

function push(letter) {
    if (state.currentCol === 5 || Object.isFrozen(state)) {
        return;
    }
    state.grid[state.currentRow][state.currentCol] = letter.toLowerCase();
    state.currentCol++;
}

function pop() {
    if (state.currentCol === 0 || Object.isFrozen(state)) {
        return;
    }
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function checkAnswer() {
    if (!Object.isFrozen(state)) {
        if (state.currentCol === 5) {
            const word = getCurrentWord();
            if (isValid(word)) {
                reveal(word);
                state.currentRow++;
                state.currentCol = 0;
            } else {
                popup('Not a valid word.');
                shakeRow();
            }
        } else {
            popup('Not enough letters.');
            shakeRow();
        }
    }
}

function enablePhysicalKeyboard() { 
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (isLetter(key)) {
            push(key);
            updateGrid();
        } else if (key === 'Backspace') {
            pop();
            updateGrid();
        } else if (key === 'Enter') {
            checkAnswer();
        }
    });
}

function enableVirtualKeyboard() {
    const keys = document.querySelectorAll('.key');
    const backspace = document.querySelector('.backspace');
    const enter = document.querySelector('.enter');

    keys.forEach((key) => {
        key.addEventListener('click', () => {
            push(key.textContent);
            updateGrid();
        });
    });

    backspace.addEventListener('click', () => {
        pop();
        updateGrid();
    });

    enter.addEventListener('click', () => {
        checkAnswer();
    });
}

// When the user clicks on div, open the popup
function popup(message) {
    const popup = document.getElementById("myPopup");
    popup.textContent = message;
    setTimeout(() => {
        popup.classList.add('show');
    });
    popup.classList.remove('show');
}

function shakeRow() {
    for (let col = 0; col < state.grid[state.currentRow].length; col++) {
        const box = document.getElementById(`box${state.currentRow}${col}`);
        setTimeout(() => {
            box.classList.toggle('shaked');
        }, 1000);
        box.classList.toggle('shaked');
    }
}

function bounceRow() {
    for (let col = 0; col < state.grid[state.currentRow - 1].length; col++) {
        const box = document.getElementById(`box${state.currentRow - 1}${col}`);
        box.classList.replace('flipped', 'first');
        box.style.animationDelay = `.${col}s`;
    }
}

function start() {
    const game = document.getElementById('game');
    drawGrid(game);
    drawKeyboard(game);

    enablePhysicalKeyboard();
    enableVirtualKeyboard();
}

start();
console.log(state.secret);
popup(state.secret);