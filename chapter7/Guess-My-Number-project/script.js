/* 
Coding Challenge #1
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
*/

'use strict';

let score = 20;
let highscore = 0;
document.querySelector('.score').textContent = score;
document.querySelector('.guess').value;

//generate secret number 1-20
let secretNumber = (Math.trunc(Math.random()*20)) + 1;

const displayMessage = function(msg){
    document.querySelector('.message').textContent = msg;
}

document.querySelector('.check').addEventListener('click', function(){
    const guess = document.querySelector('.guess').value;

    if(!guess){
        displayMessage('😥 No number!');
    }else if(Number(guess) === Number(secretNumber)){
        document.querySelector('.number').textContent = secretNumber;
        if(highscore < score){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        displayMessage('🎉 Correct Number!');
        document.querySelector('body').style.backgroundColor = ('#60b347');
    } else if(guess !== secretNumber){
        if(score > 1) {
            score --;
            document.querySelector('.score').textContent = score;
            guess > secretNumber ? displayMessage('😥 Too high!') : displayMessage('😥 Too low!');
            
        }else{
            displayMessage('😫 You lose!');
            document.querySelector('body').style.backgroundColor = ('red');
        }
    }
})

// restart the game
document.querySelector('.again').addEventListener('click', function(){
    document.querySelector('.number').textContent = '?';
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value;
    secretNumber = (Math.trunc(Math.random()*20)) + 1;
    document.querySelector('body').style.backgroundColor = ('#222');
    displayMessage('Start guessing...');
})