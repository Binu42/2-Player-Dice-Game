// Declaration of Variables
var roundScore, activePlayer, scores, gamePlay;

// Intialization of Variables
intialize();

// DOM for Roll Button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlay) {
        // Random variable to select dice between 1 and 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // If Both Dice have Six then make score to Zero
        if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            // display roundscore
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // Changing image of dice
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';
            document.getElementById('dice-1').setAttribute('src', 'images/dice-' + dice1 + '.png');
            document.getElementById('dice-2').setAttribute('src', 'images/dice-' + dice2 + '.png');
        } else {
            nextPlayer();
        }
    }
});

// DOM for Hold Button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlay) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var toWin = document.querySelector('.toWin').value;
        if (!toWin) {
            toWin = 100;
        }
        if (scores[activePlayer] >= toWin) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'Winner !'
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gamePlay = false;
        } else {
            nextPlayer();
        }
    }
});

// DOM for New Game Button
document.querySelector('.btn-new').addEventListener('click', function () {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    intialize();
});

// Function to change the Player
function nextPlayer() {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Function to Intialize the game
function intialize() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlay = true;
}