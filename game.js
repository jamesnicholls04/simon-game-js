// 'Main'

var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var gameRound = 0;
var inGameRound = 0;

run();

// Other

function run() {
  addListenerForGameStart();
  addClickListenerToButtons();
}

function addListenerForGameStart() {
    $(document).keypress(startGameOnUserPrompt);
}

function startGameOnUserPrompt(keypressEvent) {
  if (keypressEvent.key == 'a') {
    startGame();
  }
}

function startGame() {
  setTimeout(function() {
    gameRound = 0;
    seedGame();
  }, 200);
}

function seedGame() {
  gamePattern = [];
  updateRound();
}

function updateRound() {
  updateSequence();
  activateSequence();
  updateHeaderTextTo(`Round ${(gameRound + 1)}`);
}

function updateHeaderTextTo(newText) {
  $('h1').text(newText);
}

function activateSequence()  {
   gamePattern.forEach(function(element, index) {
     setTimeout(function() {
       activateButtonOfColour(element);
     }, index * 400);
  });
}

function updateSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
}


function addClickListenerToButtons() {
  $('.btn').click(onClickButtonEvent);
}

function onClickButtonEvent(event) {
  var clickedButtonColour = event.target.id;
  updateGameStateOnClickButtonOfColour(clickedButtonColour);
  activateButtonOfColour(clickedButtonColour);
}

function updateGameStateOnClickButtonOfColour(colour) {
  var correctColour = correctButtonColour();
  if (colour == correctColour) {
    onCorrectButtonClick();
  } else {
    onIncorrectButtonClick();
  }
}

function correctButtonColour() {
  return gamePattern[inGameRound];
}

function onCorrectButtonClick() {
  var completedRound = inGameRound == gamePattern.length - 1;
  if (completedRound) {
    onRoundComplete();
  } else {
    inGameRound++;
  }
}

function onRoundComplete() {
  gameRound++;
  inGameRound = 0;
  setTimeout(function () {
    updateRound();
  }, 800);
}


function onIncorrectButtonClick() {
  playGameOverSound();
  updateHeaderTextTo('Press A Key to Start');
}

function playGameOverSound() {
  var endSoundFile = 'sounds/wrong.mp3';
  var audio = new Audio(endSoundFile);
  audio.play();
}

function activateButtonOfColour(colour) {
  playSoundForButtonOfColour(colour);
  animateButtonOfColour(colour);

}

function playSoundForButtonOfColour(colour) {
  var soundFile = 'sounds/' + colour + '.mp3';
  var audio = new Audio(soundFile);
  audio.play();
}

function animateButtonOfColour(colour) {
  var button = $('#' + colour);
  animatePressOnElement(button);
}

function animatePressOnElement(element) {
  var pressedClass = 'pressed';
  element.fadeOut(100).fadeIn(100);
}
