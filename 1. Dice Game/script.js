var playerOne = 0; 
var playerTwo = 0; 
var winner = document.getElementById("winner")
function rollTheDice(player){
    let dice = Math.floor(Math.random()*6 +1);

    if(player == "player1" && playerOne == 0){
        playerOne = dice;
        var playerOneImg = document.getElementById("player1-dice");
        playerOneImg.src = "dice"+dice+".png";
        if(playerTwo == 0 ){
            winner.innerHTML = "Player 2 turn"
        }
    }
    else if(player == "player2" && playerTwo == 0){
        playerTwo = dice; 
        var playerTwoImg = document.getElementById("player2-dice");
        playerTwoImg.src = "dice"+dice+".png";
        playerTwo = dice;
        if(playerOne == 0 ){
            winner.innerHTML = "Player 1 turn"
        }
    }   
    if(playerOne && playerTwo){
        console.log(playerOne)
        console.log(playerTwo)
        let player1 = document.getElementById("p1name")
        let player2 = document.getElementById("p2name")
        
        if(playerOne > playerTwo){
            player1.style.background = "green"
            player2.style.background = "red"
            winner.innerHTML = "Player 1's luck was buffed by Priyanshu"
        }
        else if(playerOne < playerTwo){
            player1.style.background = "red"
            player2.style.background = "green"
            winner.innerHTML = "Player 2's luck was buffed by Priyanshu"
        }
        else {
            player1.style.background = "#FCA311"
            player2.style.background =  "#FCA311"
            winner.innerHTML = "Both players were struck with the bad luck of The GOLi"
        }
       document.getElementById("play-again").style.visibility = "visible";
    }
}

function playAgain(){
    winner.innerHTML = "The match has not started"
    document.getElementById("player1-dice").src = "rollingDice.png";
    document.getElementById("player2-dice").src = "rollingDice.png";
    document.getElementById("play-again").style.visibility = "hidden";
    document.getElementById("p1name").style.background = "#14213D";
    document.getElementById("p2name").style.background = "#14213D"; 
    playerOne = 0; 
    playerTwo = 0;
}