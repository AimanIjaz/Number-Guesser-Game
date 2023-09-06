/*
GAME FUNCTIONS
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again')
        window.location.reload();
});


// Listen to gues
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess > max || guess < min) {
        setMessage(`Please enter the number between ${min} and ${max}`, 'red');

    } else {
        // Check if won
        if (guess === winningNum) {
            // Game over - Won
            gameOver(true, `${winningNum} is correct, YOU WIN!`);

        } else {
            // Wrong Number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game Over - Lost
                gameOver(false, `Game Over, You lost. The correct number was ${winningNum}`);

            } else {
                // Game continues - Answer wrong
                // Change border color
                guessInput.style.borderColor = 'red';

                // Clear Input
                guessInput.value = '';

                // Tell about guesses left
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
                }
            }
    }
    
    
});

// Game Over 
function gameOver (won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Change text color
    message.style.color = color;
    // Show msg
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
   return Math.floor(Math.random()*(max-min+1)+min);
}

// Set msg
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}