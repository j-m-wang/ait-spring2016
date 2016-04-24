function generateCards() {
  var deck = new Array();
  var suits =  ['♠','♥','♣', '♦'];
  var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < faces.length; j++) {
      deck.push({'suit':suits[i], 'face':faces[j]});
    }
  }
  return deck;
}

function shuffle(array) {
  var shuffled = [];
  while (array.length > 0) {
    var index = Math.floor(Math.random()* array.length);
    var insert = array.splice(index, 1);
    shuffled.push(insert[0]);
  }
  return shuffled;
}

function calculateHand(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].face === 'J' || array[i].face === 'Q' || array[i].face === 'K') {
      //multiply by 1 to force additon instead of concat
      total += (10*1);
    } else if (array[i].face === 'A') {
      if (total < 11) {
        total += (11*1);
      } else {
        total += (1*1);
      }
    } else {
      total += ((array[i].face)*1);
    }
  }
  return total;
}

function determineWinner(playerScore, compScore) {
  var winner;
  var tempPlayer = 21 - playerScore;
  var tempComp = 21 - compScore;
  if ((tempPlayer < 0) && (tempComp < 0)) {
    winner = "Tie!";
  } else if (tempPlayer < 0) {
    winner = "Computer Wins";
  } else if (tempComp < 0) {
    winner = "Player Wins!";
  } else if (tempPlayer > tempComp) {
    winner = "Computer Wins";
  } else if (tempComp > tempPlayer) {
    winner = "Player Wins!";
  } else {
    winner = "Tie!";
  }
  return winner;
}

exports.generateCards = generateCards;
exports.shuffle = shuffle;
exports.calculateHand = calculateHand;
exports.determineWinner = determineWinner;
