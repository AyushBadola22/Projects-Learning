var started = false;
var totalTiles = ["redTile", "greenTile", "yellowTile", "blueTile"];
var currentLevel = 1;
var highestScore = 0;
var currentScore = 0;
var correctSequence = [];
var result = true;
var userSequence = [];
var bug = 0;

function generateNumber() {
    return Math.floor(Math.random() * 4);
}

function isMobileView() {
    return $(window).width() <= 1080;
}

// Improved animation function
function animateTile(key) {
    const size = isMobileView() ? "32vw" : "16vw";

    $(key)
        .addClass("bot-click")
        .animate({
            height: size,
            width: size
        }, 150, "swing", function () {
            $(this).removeClass("bot-click");
        })
        .delay(300)
        .animate({
            height: isMobileView() ? "30vw" : "15vw",
            width: isMobileView() ? "30vw" : "15vw"
        }, 150, "swing");
}


function playSound(tile) {
    tile = tile.replace("Tile", "");
    var audio = new Audio("sounds/" + tile + ".mp3");
    audio.play();
}

$(".tiles").click(function (event) {
    if (!started && !bug) {
        $("h1.current-level").text("Level : " + currentLevel);
        started = true;
        $("div.highest-score").slideDown(800);
        $("h1.score-points").slideDown(700);
        $(".title").slideUp(400);
        bug = 1;
        game();
    } else {
        takeUserInput(event.target.id);
    }
});

function takeUserInput(key) {
    userSequence.push(key);
    animateTile("#" + key);
    let lastIndex = userSequence.length - 1;

    if (userSequence[lastIndex] !== correctSequence[lastIndex]) {
        result = false;
        new Audio("sounds/wrong.mp3").play(); 
        gameOver();
        return;
    }else {
        playSound(key);
    }

    if (userSequence.length === correctSequence.length) {
        currentScore += correctSequence.length;
        updateScoreAndLevel();
        setTimeout(function () {
            userSequence = [];
            currentLevel++;
            game();
        }, 1000);
    }
}

function botTurn() {
    let currentTurn = totalTiles[generateNumber()];
    correctSequence.push(currentTurn);

    setTimeout(function () {
        animateTile("#" + currentTurn);
        playSound(currentTurn);
    }, 600);
}

function updateScoreAndLevel() {
    $("h1.current-level").text("Level : " + currentLevel);
    $("h1.score-points").text("Score : " + currentScore + "pts");

    if (highestScore < currentScore) {
        highestScore = currentScore;
        $(".highest-score h2").text("Highest Score : " + highestScore);
    }
}

function game() {
    result = true;
    botTurn();
}

function restart() {
    currentScore = 0;
    $("h1.score-points").text("Score: " + currentScore + "pts");
    $("div.highest-score, h1.score-points").slideDown(700);
    $("h1.current-level").text("Level : " + currentLevel);
    $("#restart-button").css("display", "none");
    $(".title").slideUp(400);
    started = false; // Reset the game state
    game(); // Restart the game
}

function gameOver() {
    started = false;
    $("h1.current-level").text("Game Over!");
    currentLevel = 1;
    userSequence = [];
    correctSequence = [];
    $("h1.score-points").text("Final Score : " + currentScore + "pts");
    $(".title").slideDown(400);
    $("#restart-button").css("display", "inline");
}

// Event handler for restart button click
$("#restart-button").click(restart);
