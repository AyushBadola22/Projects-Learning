
var numbersOfButtons = document.querySelectorAll(".drum-button").length

function playDrum(key){
    switch(key){
        case "w": 
            document.querySelector("#w").classList.add("active"); 
            document.getElementById("w").style = "font-size : 95px";
            var audio = new Audio("sounds/tom-1.mp3"); 
            audio.play();
            this.setTimeout(function(){
                document.querySelector("#w").classList.remove('active');
                document.getElementById("w").style = "font-size : 75px";
            }, 200)
            break;

        case "a": 
            var audio = new Audio("sounds/tom-2.mp3"); 
            audio.play();
            document.querySelector("#a").classList.add("active"); 
            document.getElementById("a").style = "font-size : 95px";
            this.setTimeout(function(){
                document.querySelector("#a").classList.remove('active');
                document.getElementById("a").style = "font-size : 75px";
            }, 200)
            break; 

        case "s": 
            var audio = new Audio("sounds/tom-3.mp3"); 
            audio.play(); 
            document.querySelector("#s").classList.add("active"); 
            document.getElementById("a").style = "font-size : 95px";
            this.setTimeout(function(){
                document.querySelector("#s").classList.remove('active');
                document.getElementById("a").style = "font-size : 75px";
            }, 200)
            break;

        case "d": 
            var audio = new Audio("sounds/tom-4.mp3"); 
            audio.play(); 
            document.querySelector("#d").classList.add("active"); 
            document.getElementById("d").style = "font-size : 95px";
            this.setTimeout(function(){
                document.querySelector("#d").classList.remove('active');
                document.getElementById("d").style = "font-size : 75px";
            }, 200)
            break;

        case "j": 
            var audio = new Audio("sounds/snare.mp3"); 
            audio.play(); 
            document.querySelector("#j").classList.add("active"); 
            document.getElementById("j").style = "font-size : 95px";
            this.setTimeout(function(){
                document.querySelector("#j").classList.remove('active');
                document.getElementById("j").style = "font-size : 75px";
            }, 200)
            break;
            
        case "k": 
            var audio = new Audio("sounds/kick-bass.mp3"); 
            audio.play(); 
            document.querySelector("#k").classList.add("active");
             document.getElementById("k").style = "font-size : 95px";
            this.setTimeout(function(){
                document.querySelector("#k").classList.remove('active');
                document.getElementById("k").style = "font-size : 75px";
            }, 200)
            break;

        case "l": 
            var audio = new Audio("sounds/crash.mp3"); 
            audio.play(); 
            document.querySelector("#l").classList.add("active"); 
            document.getElementById("l").style = "font-size : 95px";
            this.setTimeout(function(){
                document.querySelector("#l").classList.remove('active');
                document.getElementById("l").style = "font-size : 75px";
            }, 200)
            break;  
    }
}

window.addEventListener("keydown", function(event) {
    playDrum(event.key);
})

for(var i = 0; i<numbersOfButtons; i++){
    document.querySelectorAll(".drum-button")[i].addEventListener("click", function(event){
        playDrum(event.target.innerHTML);
    })
}