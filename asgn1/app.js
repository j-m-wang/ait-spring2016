var readlineSync = require('readline-sync');
var cardUtils = require('./cardUtils');

//helper function to print array
function print(array) {
  var current = "";
  for (var i = 0; i < array.length; i++) {
    current += array[i].face + array[i].suit + " ";
  }
  return current;
}

//interactive blackjack
function blackjack (a) {
  var deck;
  if (process.argv[2]) {
    deck = JSON.parse(process.argv[2])
  } else {
    deck = cardUtils.shuffle(cardUtils.generateCards());
  }
  var playersHand = [];
  var compHand = [];

  while (deck.length >= 26) {
    for (var i = 0; i < 2; i++) {
      playersHand.push(deck.pop());
    }
    for (var i = 0; i < 2; i++) {
      compHand.push(deck.pop());
    }
      console.log("");
      console.log("Your hand is: " + print(playersHand) + " ... for a total of " + cardUtils.calculateHand(playersHand));

    while (cardUtils.calculateHand(playersHand) < 22) {
      var letter = readlineSync.question('type h to (h)it or s to (s)tay: ');
      if (letter === 's') {
        break;
      }
      playersHand.push(deck.pop());
      console.log("Your hand is: " + print(playersHand) + " ... for a total of " + cardUtils.calculateHand(playersHand));
    }

    while (cardUtils.calculateHand(compHand) < 18) {
      compHand.push(deck.pop());
    }

    console.log("Your hand: " + print(playersHand) + " (" + cardUtils.calculateHand(playersHand) + "), Computer hand: " + print(compHand) + " (" + cardUtils.calculateHand(compHand) + ")");
    console.log(cardUtils.determineWinner(( cardUtils.calculateHand(playersHand)), ( cardUtils.calculateHand(compHand))));
    console.log("");
    console.log("There are " + deck.length + " cards left in the deck.");
    console.log("-----------------------");

    playersHand = [];
    compHand = [];
  }
  console.log("Less than 26 cards left. Game over!");
}

blackjack();
