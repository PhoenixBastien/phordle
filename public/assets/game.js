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

function updateGrid() {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
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
    return dictionary.includes(word);
}

function getLetterFrequency(word, letter) {
    const regex = RegExp(`${letter}`);
    return (word.match(regex) || '').length;
}

function getLetterPosition(word, letter, position) {
    let result = 0;
    for (let i = 0; i <= position; i++) {
        if (word[i] === letter) {
            result++;
        }        
    }
    return result;
}

function reveal(guess) {
    const row = state.currentRow;
    const animation_duration = 500;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        const letterFrequencySecret = getLetterFrequency(state.secret, letter);
        const letterFrequencyGuess = getLetterFrequency(guess, letter);
        const letterPosition = getLetterPosition(guess, letter, i);
        
        setTimeout(() => {
            if (letterFrequencyGuess > letterFrequencySecret
                && letterPosition > letterFrequencySecret) {
                box.classList.add('wrong');
            } else {
                if (letter === state.secret[i]) {
                    box.classList.add('right-position');
                } else if (state.secret.includes(letter)) {
                    box.classList.add('wrong-position');
                } else {
                    box.classList.add('wrong');
                }
            }
        }, ((i + 1) * animation_duration) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }

    const isWinner = state.secret === guess;
    const isLoser = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            switch (state.currentRow) {
                case 0:
                    alert('Genius');
                    break;
                case 1:
                    alert('Magnificent');
                    break;
                case 2:
                    alert('Impressive');
                    break;
                case 3:
                    alert('Splendid');
                    break;
                case 4:
                    alert('Great');
                    break;
                case 5:
                    alert('Phew');
                    break;
            }
        } else if (isLoser) {
            alert(state.secret);
        }
    }, 3 * animation_duration);
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
    if (state.currentCol === 0) {
        return;
    }
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function checkAnswer() {
    if (state.currentCol === 5) {
        const word = getCurrentWord();
        if (isValid(word)) {
            reveal(word);
            state.currentRow++;
            state.currentCol = 0;
        } else {
            alert('Not a valid word.');
        }
    } else {
        alert('Not enough letters.');
    }
}

function registerPhysicalKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            checkAnswer();
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

function registerVirtualKeyboardEvents() {
    const buttons = document.querySelectorAll('.key');
    const backspace = document.querySelector('.backspace');
    const enter = document.querySelector('.enter');

    buttons.forEach(key => {
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
        // alert(state.grid);
        checkAnswer();
    });
}

function start() {
    const game = document.getElementById('game');
    drawGrid(game);
    drawKeyboard(game);

    registerPhysicalKeyboardEvents();
    registerVirtualKeyboardEvents();
}

start();