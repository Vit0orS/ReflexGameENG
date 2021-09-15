var score = 0;
var shipDead=0;
var hp=3;
var timeInterval;
var multiplier;
var diffEnemy = 0;

function loaded(){ // Loads a random background
    var wp = Math.floor(Math.random() * (4 - 1)) + 1;
    document.getElementById("mainMenu").style.background = `url(images/bgmm${wp}.jpg) no-repeat center center fixed`;
    document.getElementById("mainMenu").style['-webkit-background-size-'] = "cover";
    document.getElementById("mainMenu").style['-moz-background-size-'] = "cover";
    document.getElementById("mainMenu").style['-o-background-size-'] = "cover";
    document.getElementById("mainMenu").style['background-size'] = "cover";
}

function chooseDifficulty(){ // Function that happens after the player presses "play"
    document.getElementById("playButton").remove();

    var diff = document.getElementsByClassName("difficulty");

    diff[0].style.display = "inline"; //
    diff[1].style.display = "inline"; // Shows difficulty buttons
    diff[2].style.display = "inline"; //
}

function playGame(difficulty){  // Sets the difficulty and starts the game                        
    document.getElementById("health").innerHTML = `HP = ${hp}`;
    document.getElementById("score").innerHTML = `Score = ${score}`;
    if (difficulty==1){
        timeInterval=3000;
        multiplier=1;
        //This is just a PR test
    }
    if (difficulty==2){
        timeInterval=1500;
        multiplier=2;
    }
    if (difficulty==3){
        timeInterval=1000;
        multiplier=5;
    }

    document.getElementById("mainMenu").remove();

    console.log(timeInterval);

    sendShip();

}

function sendShip(){
    
    console.log("Ship created");
    shipDead=0; // Variable used to prevent the player from clicking on the same object twice while the explosion is happening
    var t = Math.floor(Math.random() * 93); // Gets a random "style.top" position
    var pos = Math.floor(Math.random() * 200); // Gets a random "style.left" position
    pos/=2;
    var game = document.getElementById("game"); 
    ship = document.createElement("img");
    ship.style.width = "130px";
    ship.style.height = "130px";
    ship.src = "images/incredibleEnemy.png";
    ship.style.position = "absolute";  
    ship.style.top = t + "%";
    ship.style.left = pos + "%";
    var timer = setTimeout(damage, timeInterval, ship); // Set a timeout, if the player does not click the ship in "timeInterval/1000" seconds the ship is deleted and the player takes one point of damage
    ship.addEventListener("click", function(){ // What happens if the player clicks the ship.
        ship.src = "images/incredibleExplosion.png"; 
        clearTimeout(timer);
        removeShip(ship);
    });

    game.appendChild(ship);
    return 0;
}

function removeShip(shipElement){
    if (shipDead==0){
        var clickSound = document.getElementById("clickSound");
        clickSound.play();
        setTimeout(removeElement, 300, shipElement);
        shipDead=1;
        score+=multiplier;
        document.getElementById("score").innerHTML = `Score = ${score}`;
        console.log(score);
        var time = Math.floor(Math.random() * (10000 - 1000)) + 1000; // Gets a random time from 1 second to 10 seconds for the next ship to appear.
        if(hp>0){
            setTimeout(sendShip, time);
        }
    }
}

function removeElement(ship){
    ship.remove();
}

function damage(shipElement){
    var failSound = document.getElementById("failSound");
    shipElement.remove();
    failSound.play();
    hp--;
    document.getElementById("health").innerHTML = `HP = ${hp}`;
    console.log(hp);
    var time = Math.floor(Math.random() * (10000 - 1000)) + 1000;
    if (hp==0){
        gameOver();
    }
    if(hp>0){
        setTimeout(sendShip, time);
    }
}

function gameOver(){
    alert("You lost.");
    document.getElementById("scoreP").innerText = `Your score was: ${score}`;
}