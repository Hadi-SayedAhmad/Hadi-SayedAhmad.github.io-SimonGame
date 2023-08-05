var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var buttons = document.getElementsByClassName("btn");
var userClickedPattern = [];
var started = false;
var level = 0;
var heading = document.getElementById("level-title");

document.addEventListener("keydown", function () {
    if (started === false) {
        started = true;
        nextSequence();
    }
});

for (var i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function () {
        if (started === true) {
            var userChosenColour = this.id;
            animatePress(userChosenColour);
            playSound(userChosenColour);
            // console.log(userChosenColour);
            userClickedPattern.push(userChosenColour);
            console.log(userClickedPattern);
            // console.log(userClickedPattern);
            checkAnswer(userClickedPattern.length - 1);
        }
        else
        {
            alert("Start the game first!");
        }

    });



}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {

        playSound("wrong");
        document.body.classList.add("game-over");
        heading.innerHTML = "GAME OVER! Press any key to restart the game";
        setTimeout(function () {
            document.body.classList.remove("game-over");

        }, 200)
        startOver();





    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    heading.innerHTML = "level " + level;
    var randomNumber = Math.floor(Math.random() * 5) - 1;
    if (randomNumber === -1) {
        randomNumber += 1;
    }
    // console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);

    var sameIDButton = document.getElementById(randomChosenColour);
    // console.log(sameIDButton);

    sameIDButton.classList.add("pressed");

    setTimeout(function () {
        playSound(randomChosenColour);
        sameIDButton.classList.remove("pressed");
    }, 100);


    console.log(gamePattern);


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var button = document.getElementById(currentColour);
    button.classList.add("pressed");
    setTimeout(function () {
        button.classList.remove("pressed");
    }, 100);
}

function startOver() {

    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;


}

