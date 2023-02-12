import { dictionary } from './dictionary.js'

const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5). fill('')),
    currentRow: 0,
    currentCol: 0,
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

function updateGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid.length; j++) {
            box.textContent = state.grid[i][j];
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
    
    const row1 = document.createElement('div');
    row1.className = 'row';

    const lettersRow1 = 'qwertyuiop';
    for (let i = 0; i < lettersRow1.length; i++) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = lettersRow1.charAt(i);

        row1.appendChild(button);
    }

    keyboard.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'row';

    const lettersRow2 = 'asdfghjkl';
    for (let i = 0; i < lettersRow2.length; i++) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = lettersRow2.charAt(i);

        row2.appendChild(button);
    }

    keyboard.appendChild(row2);

    const row3 = document.createElement('div');
    row3.className = 'row';

    const enter = document.createElement('button');
    enter.className = 'enter';
    enter.textContent = '⏎';
    row3.appendChild(enter);

    const lettersRow3 = 'zxcvbnm';
    for (let i = 0; i < lettersRow3.length; i++) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = lettersRow3.charAt(i);
        
        row3.appendChild(button);
    }
    
    const backspace = document.createElement('button');
    backspace.className = 'backspace';
    backspace.textContent = '⌫';
    row3.appendChild(backspace);

    keyboard.appendChild(row3);
    container.appendChild(keyboard);
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isValid(word)) {
                    reveal(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    alert('Not a valid word.');
                }
            }
        }
        if (key === 'Backspace') {
            pop();
        }
        if (isLetter(key)) {
            push(key);
        }

        updateGrid();
    };
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isValid(word) {
    return dictionary.includes(word);
}

function getLetterFrequency(word, letter) {
    regex = RegExp(`${letter}`);
    (word.match(regex) || '').length;
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function push(letter) {
    if (state.currentCol === 5) {
        return;
    }
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function pop() {
    if (state.currentCol === 5) {
        return;
    }
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function start() {
    const game = document.getElementById('game');
    drawGrid(game);
    drawKeyboard(game);

    registerKeyboardEvents();
}

start();