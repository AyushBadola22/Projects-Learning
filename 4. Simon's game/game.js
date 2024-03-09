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

function animateTile(key) {
    $(key).addClass("bot-click");
    const size = isMobileView() ? "32vw" : "16vw";

    $(key).animate({
        height: size,
        width: size
    }, 150, "swing");

    setTimeout(function () {
        $(key).removeClass("bot-click").animate({
            height: isMobileView() ? "30vw" : "15vw",
            width: isMobileView() ? "30vw" : "15vw"
        }, 150, "swing");
    }, 300);
}

function callTheSequence(tile) {
    animateTile("#" + tile);
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
    callTheSequence(key);

    let lastIndex = userSequence.length -1; 
    if(userSequence[lastIndex] != correctSequence[lastIndex]){
        result = false; 
        gameOver(); 
        return; 
    }

    if (userSequence.length === correctSequence.length) {
        setTimeout(function () {
            userSequence = [];
            currentLevel++;
            currentScore += correctSequence.length; 
            $("h1.current-level").text("Level : " + currentLevel);
            $("h1.score-points").text("Score :  "+currentScore+"pts")
            if(highestScore < currentScore){
                highestScore = currentScore; 
                $(".highest-score h2").text("Highest Score : "+highestScore); 
            }
            game();
        }, 1000);
    }
}

function botTurn() {
    let currentTurn = totalTiles[generateNumber()];
    correctSequence.push(currentTurn);
    setTimeout(function () {
        callTheSequence(currentTurn);
    }, 600);
}

function game() {
    result = true;
    botTurn();
}


function restart() {
    currentScore = 0;
    $("h1.score-points").text("Score: " + currentScore + "pts");
    $("div.highest-score").slideDown(800);
    $("h1.score-points").slideDown(700);
    $("h1.current-level").text("Level : "+currentLevel);
    $("#restart-button").css("display", "none");
    $(".title").slideUp(400);
    started = false; // Assuming you want to reset the game state
    game(); // Restart the game
}

function gameOver() {
    started = false;
    $("h1.current-level").text("Game Over!");
    currentLevel = 1;
    userSequence = [];
    correctSequence = [];
    $("h1.score-points").text("Final Score : " + currentScore+ "pts");
    $(".title").slideDown(400);
    $("#restart-button").css("display", "inline");
}

// Assuming you have a restart button with id "restart-button"
$("#restart-button").click(restart);
