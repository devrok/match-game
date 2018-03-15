

$(document).ready(function() {


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
    console.log(randIndex);
    newArray.push(valuePairs[randIndex]);
    valuePairs.splice(randIndex,1);
    console.log("Old: " + valuePairs);
    console.log("New: " + newArray);
  }

  return newArray;
};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
