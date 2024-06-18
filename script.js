let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remainingSlot = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let NumGuesses = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 0');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);
        if (NumGuesses === 11) {
            displayGuess(guess);
            displayMessage(`Game over, the random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You got it right!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is too low`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is too high`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    NumGuesses++;
    remainingSlot.innerHTML = `Remaining guesses: ${11 - NumGuesses}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.setAttribute('disabled', '');
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('button');
    newGameButton.innerHTML = 'Start New Game';
    startOver.appendChild(newGameButton);
    playGame = false;

    newGameButton.addEventListener('click', function() {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        NumGuesses = 1;
        guessSlot.innerHTML = '';
        remainingSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        userInput.removeAttribute('disabled');
        startOver.removeChild(newGameButton);
        playGame = true;
    });
}
