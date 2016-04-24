// calls js when DOM has fully loaded
document.addEventListener('DOMContentLoaded', main);

function main() {
  console.log("dom contents loaded..js running");
  //hides game + error-message divs
  var gameID = document.getElementById("game");
  gameID.classList.add("changeVisibility");
  var errID = document.getElementById("error-message");
  errID.classList.add("changeVisibility");

  //starts game
  var buttons = document.querySelectorAll("button");
  var startBtn = buttons[0];
  startBtn.addEventListener('click', game);
}

//global variables
var pinnedDie = [0, 0, 0, 0, 0];
var globalPlayerScore = 0;
var computerScoreTotal = 0;

function game() {
  console.log("starting game..");
  var introID = document.getElementById('intro');
  introID.classList.add('hideLayout');
  //compute computer's score
  computerScore();

  //create DOM dice
  var gameID = document.getElementById("game");
  // var dice = document.createElement('div');
  var die1 = document.createElement('div');
  var die2 = document.createElement('div');
  var die3 = document.createElement('div');
  var die4 = document.createElement('div');
  var die5 = document.createElement('div');
  die1.classList.add("squares");
  die2.classList.add("squares");
  die3.classList.add("squares");
  die4.classList.add("squares");
  die5.classList.add("squares");
  gameID.appendChild(die1);
  gameID.appendChild(die2);
  gameID.appendChild(die3);
  gameID.appendChild(die4);
  gameID.appendChild(die5);
  // gameID.appendChild(dice);

  //add in <br>'s
  gameID.appendChild(document.createElement('br'));
  gameID.appendChild(document.createElement('br'));

  //add roll + pin buttons
  var rollBtn = document.createElement('button');
  var pinBtn = document.createElement('button');
  rollBtn.innerHTML = 'Roll';
  pinBtn.innerHTML = 'Pin';
  pinBtn.disabled = true;
  gameID.appendChild(rollBtn);
  gameID.appendChild(pinBtn);

  rollBtn.addEventListener('click', rollDice);
}

function rollDice() {
  console.log("roll pushed");
  var dice = document.getElementsByClassName("squares");
  for (var x = 0; x < dice.length; x++) {
    if (pinnedDie[x] === 0) {
      dice[x].innerHTML = Math.floor(Math.random() * 6) + 1;
      //turns die blue if hovering
      dice[x].classList.add("rollOver");
    }
  }
  var buttons = document.querySelectorAll('button');
  // console.log('buttons', buttons);
  var rollBtn = buttons[1];
  var pinBtn = buttons[2];
  rollBtn.disabled = true;
  pinBtn.removeAttribute('disabled');

  //turn die grey when clicked
  var die1 = dice[0];
  var die2 = dice[1];
  var die3 = dice[2];
  var die4 = dice[3];
  var die5 = dice[4];
  die1.addEventListener('click', toggleClick1);
  die2.addEventListener('click', toggleClick2);
  die3.addEventListener('click', toggleClick3);
  die4.addEventListener('click', toggleClick4);
  die5.addEventListener('click', toggleClick5);

  pinBtn.addEventListener('click', handlePinBtn);
}
//toggle clicked die
function toggleClick1() {
  var die1 = document.getElementsByClassName('squares')[0];
  if (die1.innerHTML == '') {
    var modalPTag = document.getElementsByClassName('modal')[0].firstChild.nextSibling;
    modalPTag.innerHTML = "You selected a die before you've rolled. Roll first!";
    modalPTag.classList.add('addPadding');
    overlayFunc();
  } else {
    die1.classList.toggle('clicked');
  }
}
function toggleClick2() {
  var die2 = document.getElementsByClassName('squares')[1];
  if (die2.innerHTML == '') {
    var modalPTag = document.getElementsByClassName('modal')[0].firstChild.nextSibling;
    modalPTag.innerHTML = "You selected a die before you've rolled. Roll first!";
    modalPTag.classList.add('addPadding');
    overlayFunc();
  } else {
    die2.classList.toggle("clicked");
  }
}
function toggleClick3() {
  var die3 = document.getElementsByClassName('squares')[2];
  if (die3.innerHTML == '') {
    var modalPTag = document.getElementsByClassName('modal')[0].firstChild.nextSibling;
    modalPTag.innerHTML = "You selected a die before you've rolled. Roll first!";
    modalPTag.classList.add('addPadding');
    overlayFunc();
  } else {
    die3.classList.toggle("clicked");
  }
}
function toggleClick4() {
  var die4 = document.getElementsByClassName('squares')[3];
  if (die4.innerHTML == '') {
    var modalPTag = document.getElementsByClassName('modal')[0].firstChild.nextSibling;
    modalPTag.innerHTML = "You selected a die before you've rolled. Roll first!";
    modalPTag.classList.add('addPadding');
    overlayFunc();
  } else {
    die4.classList.toggle("clicked");
  }
}
function toggleClick5() {
  var die5 = document.getElementsByClassName('squares')[4];
  if (die5.innerHTML == '') {
    var modalPTag = document.getElementsByClassName('modal')[0].firstChild.nextSibling;
    modalPTag.innerHTML = "You selected a die before you've rolled. Roll first!";
    modalPTag.classList.add('addPadding');
    overlayFunc();
  } else {
    die5.classList.toggle("clicked");
  }
}

function handlePinBtn() {
  console.log('pin pushed');
  //check if something was pinned this round..
  var beforeRound = 0;
  for (var x = 0; x < pinnedDie.length; x++) {
    if (pinnedDie[x] === 1) {
      beforeRound += 1;
    }
  }

  var flag = 0;
  var dice = document.getElementsByClassName('squares');
  var die1 = dice[0];
  var die2 = dice[1];
  var die3 = dice[2];
  var die4 = dice[3];
  var die5 = dice[4];
  if (die1.classList.contains('clicked')) {
    die1.classList.add("added");
    die1.classList.remove("rollOver");
    flag = 1;
    pinnedDie[0] = 1;
  }
  if (die2.classList.contains('clicked')) {
    die2.classList.add('added');
    die2.classList.remove("rollOver");
    flag = 1;
    pinnedDie[1] = 1;
  }
  if (die3.classList.contains('clicked')) {
    die3.classList.add('added');
    die3.classList.remove("rollOver");
    flag = 1;
    pinnedDie[2] = 1;
  }
  if (die4.classList.contains('clicked')) {
    die4.classList.add('added');
    die4.classList.remove("rollOver");
    flag = 1;
    pinnedDie[3] = 1;
  }
  if (die5.classList.contains('clicked')) {
    die5.classList.add('added');
    die5.classList.remove("rollOver");
    flag = 1;
    pinnedDie[4] = 1;
  }

  var afterRound = 0;
  for (var x = 0; x < pinnedDie.length; x++) {
    if (pinnedDie[x] === 1) {
      afterRound += 1;
    }
  }

  var buttons = document.querySelectorAll('button');
  var rollBtn = buttons[1];
  var pinBtn = buttons[2];
  //to ensure no duplicates counted in score
  var lastRoundScore = globalPlayerScore;
  var playerScore = document.getElementsByClassName('player')[0];
  if ((flag === 1) && (afterRound > beforeRound)) {
    for (var x = 0; x < dice.length; x++) {
      if (pinnedDie[x] === 0) {
        console.log("blanking boxes");
        dice[x].innerHTML = '';
      } else {
        if (dice[x].innerHTML === '3') {
          //add nothing
        } else {
          globalPlayerScore += parseInt(dice[x].innerHTML);
        }
      }
    }
    globalPlayerScore -= lastRoundScore;
    playerScore.innerHTML = 'Your Score: ' + globalPlayerScore;
    console.log('globalPlayerScore', globalPlayerScore);
    flag = 0;
    console.log('flag is', flag);
    pinBtn.disabled = true;
    rollBtn.removeAttribute('disabled');
  } else {
    //if user tries to pin before selecting a die..
    var modalPTag = document.getElementsByClassName('modal')[0].firstChild.nextSibling;
    modalPTag.innerHTML = 'You tried to pin nothing! Please select a die and then pin.';
    modalPTag.classList.add('addPadding');
    toggleVisibility();
    var errorBtn = buttons[3];
    errorBtn.addEventListener('click', toggleVisibility);
  }

  //when all dice have been pinned
  if (afterRound === 5) {
    pinBtn.disabled = true;
    rollBtn.disabled = true;
    var outcome = document.createElement('p');
    if (computerScoreTotal < globalPlayerScore) {
      var text = 'You Lose!';
      outcome.classList.add("lose");
    } else if (globalPlayerScore < computerScoreTotal) {
      var text = 'You Win!';
      outcome.classList.add("win");
    } else {
      var text = "It's a Tie!";
      outcome.classList.add("tie");
    }
    var content = document.createTextNode(text);
    outcome.appendChild(content);
    playerScore.appendChild(outcome);
    // var restartBtn = document.createElement('button');
    // restartBtn.innerHTML = 'Restart';
    // restartBtn.addEventListener('click', restartFunc);
    // var gameID = document.getElementById("game");
    // gameID.appendChild(restartBtn);
  }
}

// function restartFunc() {
//   computerScore();
// }

function overlayFunc() {
  console.log('overlay pressed');
  toggleVisibility();

  var buttons = document.querySelectorAll('button');
  var errorBtn = buttons[3];
  errorBtn.addEventListener('click', toggleVisibility);
}

function toggleVisibility() {
  var errID = document.getElementById("error-message");
  errID.classList.toggle("changeVisibility");
}

//compute the computer's score
function computerScore() {
  var finalScores = [];
  var numOfDieLeft = 5;
  for (var i = 0; i < 5; i++) {
    var thisRoll = [];
    //rolls non-pinned dice
    for (var x = 0; x < numOfDieLeft; x++) {
      thisRoll.push(Math.floor(Math.random() * 6) + 1);
    }
    // console.log('this roll', thisRoll);
    //pins the lowest roll
    if (thisRoll.includes(3)) {
      finalScores.push(0);
    } else if (thisRoll.includes(1)) {
      finalScores.push(1);
    } else if (thisRoll.includes(2)) {
      finalScores.push(2);
    } else if (thisRoll.includes(4)) {
      finalScores.push(4);
    } else if (thisRoll.includes(5)) {
      finalScores.push(5);
    } else {
      finalScores.push(6);
    }
    numOfDieLeft -= 1;
  }
  //displays the computer's score
  var gameID = document.getElementById("game");
  gameID.classList.remove("changeVisibility");
  var compScore = document.createElement('p');
  var playerScore = document.createElement('p');
  //adds class 'player' to player score
  playerScore.classList.add("player");
  var tempPlayer = 'Your Score: 0';
  var tempString = 'Computer Score: ';
  for (var y = 0; y < finalScores.length; y++) {
    computerScoreTotal += finalScores[y];
    if (y == finalScores.length-1) {
      if (finalScores[y] === 0) {
        tempString += finalScores[y] + ' (3)';
      } else {
        tempString += finalScores[y];
      }
    } else {
      if (finalScores[y] === 0) {
        tempString += finalScores[y] + ' (3) + ';
      } else {
        tempString += finalScores[y] + ' + ';
      }
    }
  }
  tempString += ' = ' + computerScoreTotal;
  var content = document.createTextNode(tempString);
  var contentPlayer = document.createTextNode(tempPlayer);
  compScore.appendChild(content);
  playerScore.appendChild(contentPlayer);
  gameID.appendChild(compScore);
  gameID.appendChild(playerScore);
  // console.log('final score', tempString);
}
