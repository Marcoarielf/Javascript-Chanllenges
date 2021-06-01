'use strict';

// Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    // check for rolled 1: if true, switch to next player

    if(diceNumber !== 1){
        // add score
        currentScore += diceNumber;
        console.log(diceNumber);
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    }else{
        // switch player
        switchPlayer();
    }
});

btnHold.addEventListener('click',function(){
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    // 2. Check if player's score is >= 100
    if(scores[activePlayer] >= 100){
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--active');
        
        dice.classList.add('hidden');
        btnRoll.setAttribute('disabled',true);
        btnHold.setAttribute('disabled',true);
    }else{
        switchPlayer();
    }
    // Finish game

    // Switch to the next player.
})

btnNew.addEventListener('click', function(){
    btnRoll.removeAttribute('disabled');
    btnHold.removeAttribute('disabled');
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    activePlayer = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    dice.classList.remove('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
})