var buttonColors = ["red", "yellow", "blue", "green"];//Used to chose which color should be displayed next in the sequence.
var gamePattern = [];//until now what is the pattern of the colors in the game.
var userPattern = [];
var computerChosenColor;
var start = false;
var level=0;
var clickCount=0;
var checkCount=0;
var userChosen;



$(document).keypress(function () {
  if (start == false) {

    nextSequence();
    start = true;
  }
});


function nextSequence() {
  clickCount=0;
  checkCount=0;
  userPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.random() * 4;//this limts the random number genrated from 0 1o 3 and stores it in a variable.
  randomNumber = Math.floor(randomNumber);//rounds the random number as it is in decimal.



  computerChosenColor = buttonColors[randomNumber];//through the random number a color is picked from the array
  gamePattern.push(computerChosenColor);

  $("#" + computerChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio(computerChosenColor + '.mp3');
  audio.play();
}



$(".btn").click(function () {
  userChosen = $(this).attr("id");
  userPattern.push(userChosen);
  clickSound(userChosen);
  animate(userChosen);
  clickCount++;
  if (clickCount == level && clickCount!==0) {
    checkAnswer(level);
  }
  
});


function clickSound(current) {
  var clickAudio = new Audio(current + '.mp3');
  clickAudio.play();
}

function animate(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function checkAnswer(lvl) {
  for ( var i = 0; i <lvl; i++) {
    if (gamePattern[i] === userPattern[i]) {
      checkCount++;
    }
    else{
      wrong();
      break;
    }
  }
  if (checkCount==level) {
    setTimeout(function () {
      nextSequence();
    }, 200);
  }

  function wrong() {
    console.log("wrong");


    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    //2. Call startOver() if the user gets the sequence wrong.
    startOver();

  }

  //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
}
function startOver() {
  start = false;
  level = 0;
  gamePattern=[];
}