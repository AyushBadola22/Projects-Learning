var isStatus = document.querySelector("#status"); 

var petbutton = document.querySelector("#container button");

var isHappy = 0; 

petbutton.addEventListener("click", function(){
    if(!isHappy){
        isStatus.innerHTML = "Happy"; 
        isStatus.style.color = "green"
        petbutton.textContent = "Stop petting";
        isHappy = 1;
    } 
    else {
        isStatus.innerHTML = "Angry"; 
        isStatus.style.color = "red"; 
        petbutton.textContent = "Pet the cat"; 
        isHappy = 0;
    }
})
