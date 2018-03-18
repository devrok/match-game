$(document).ready(function() {
  var cardValues = MatchGame.generateCardValues();
  var $game = $("#game");

  MatchGame.renderCards(cardValues,$game)
});

var MatchGame = {};
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
  var valuePairs = [];

  for(var i = 1; i < 9 ; i++) {
    valuePairs.push(i);
    valuePairs.push(i);
  }

  var newArray = [];

  while (valuePairs.length > 0) {
    var randIndex = Math.floor(Math.random() * valuePairs.length);
    // console.log(randIndex);
    newArray.push(valuePairs[randIndex]);
    valuePairs.splice(randIndex,1);
    // console.log("Old: " + valuePairs);
    // console.log("New: " + newArray);
  }

  return newArray;
};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {
  // $("#game").empty();
  $game.empty();
  $game.data("flippedCards", []);

  for(var i = 0; i < cardValues.length; i++) {
    var $card = $("<div class=\"col-xs-3 card\"></div>");
    $card.data("cardData", createCard(cardValues[i]));

    $game.append($card);
  }

  $("#game .card").click(function (){
    var $game = $("#game");
    var flippedCards = $game.data("flippedCards");

    MatchGame.flipCard($(this), $game);
  });
};

function createCard(value) {
  return card = {
    value: value,
    color: getColorByValue(value),
    flipped: false
  };
}

function getColorByValue(value) {
  var colors = ["hsl(25, 85%, 65%);", "hsl(55, 85%, 65%);",
"hsl(90, 85%, 65%);", "hsl(160, 85%, 65%);", "hsl(220, 85%, 65%);",
"hsl(265, 85%, 65%);", "hsl(310, 85%, 65%);", "hsl(360, 85%, 65%);"];

  if (value > 0 && value < 9) {
    return colors[value-1];
  }

  throw console.error("Unexpected value '" + value +"'");
}


/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  var cardData = $card.data("cardData");
  var flippedCards = $game.data("flippedCards");

  if (cardData.flipped) {
    return;
  }

  if (!cardData.flipped) {
    // set to flipped
    updateCard($card, cardData, true, cardData.color, cardData.value);
    flippedCards.push(cardData);
  }

  if (flippedCards.length === 2) {
    if (flippedCards[0].value === flippedCards[1].value) {
      updateCard($card, cardData, true, "rgb(153, 153, 153);", "");
    }
    else {
      // reset card
      updateCard($card, cardData, false, "rgb(32, 64, 86);", "");
    }
    // reset array of flipped cards
    $game.data("flippedCards", []);
  }
};

function updateCard($card, cardData, newFlipValue, newColorValue, newValue) {
  cardData.flipped = newFlipValue;
  $card.css("background-color", newColorValue);
  $card.text(newValue);
  $card.Data("cardData", cardData);
}
