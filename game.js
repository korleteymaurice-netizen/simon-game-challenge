var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
// var randomChosenColour = buttonColours[0,1,2,3];
var randomChosenColour;
// function nextSequence(){
// var randomNumber = Math.random();
// randomNumber = randomNumber * 3;
// randomNumber = Math.floor;
// }
// buttonColours.push(randomChosenColour);
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
// var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
// audio.play();

// $(".btn").on('click', function(){
//     var userChosenColour = this.id;
//     userClickedPattern.push(userChosenColour);
// });

$(".btn").on("click", function () {
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});



// $(".btn").click(function () {
//   var userChosenColour = $(this).attr("id");
//   var audio = new Audio("sounds/" + userChosenColour + ".mp3");
//   audio.play();
// });

// function playSound(name) {
//   playSound(randomChosenColour);
// }
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

var started = false;
var level = 0;

$(document).keydown(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        

        if (userClickedPattern.length === gamePattern.length) {
            

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}