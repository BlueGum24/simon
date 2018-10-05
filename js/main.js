
let sequence = [];
let playerSequence = [];
let flash;
let turn;
let compTurn;
let correct;
let intervalId;
let strict = false;
let sound = true;
let power = false;
let win;

const score = document.querySelector("#score");
const level = document.querySelector("#level");
const startBtn = document.querySelector("#start");
const strictBtn = document.querySelector("#strict");
const powerBtn = document.querySelector("#power");
const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");

strictBtn.addEventListener('click', (event) => {
    if(strictBtn.checked) {
        strict = true;
    } else {
        strict = false;
    }
});

powerBtn.addEventListener('click', (event) => {
    if(powerBtn.checked) {
        power = true;
        level.innerHTML = "--";
    } else {
        power = false;
        level.innerHTML = 0;
        clearColor();
        clearInterval(intervalId);
    }
});

startBtn.addEventListener("click", (event) => {
    if(power || win) {
        play();
    }
});

function play() {
    win = false;
    sequence = [];
    playerSequence = [];
    flash = 0;
    intervalId = 0;
    turn  = 1;
    level.innerHTML = 1;
    correct = true;
    for(let i = 0; i < 20; i++) {
        sequence.push(Math.floor(Math.random() * 4 ) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    power = false;
    if(flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        power = true;
    }

    if(compTurn) {
        clearColor();
        setTimeout(() => {
            if(sequence[flash] == 1) one();
            if(sequence[flash] == 2) two();
            if(sequence[flash] == 3) three();
            if(sequence[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    if(sound) {
        let audio = document.getElementById("sound1");
        audio.play();
    }
    sound = true;
    topLeft.style.backgroundColor = "tomato";
}

function two() {
    if(sound) {
        let audio = document.getElementById("sound2");
        audio.play();
    }
    sound = true;
    topRight.style.backgroundColor = "lightgreen";
}

function three() {
    if(sound) {
        let audio = document.getElementById("sound3");
        audio.play();
    }
    sound = true;
    bottomLeft.style.backgroundColor = "lightskyblue";
}

function four() {
    if(sound) {
        let audio = document.getElementById("sound4");
        audio.play();
    }
    sound = true;
    bottomRight.style.backgroundColor = "yellow";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkred";
    topRight.style.backgroundColor = "darkgreen";
    bottomLeft.style.backgroundColor = "dodgerblue";
    bottomRight.style.backgroundColor = "goldenrod";
}


function flashColor() {
    topLeft.style.backgroundColor = "tomato";
    topRight.style.backgroundColor = "lightgreen";
    bottomLeft.style.backgroundColor = "lightskyblue";
    bottomRight.style.backgroundColor = "yellow";
}

topLeft.addEventListener("click", (event) => {
    if(power) {
        playerSequence.push(1);
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener("click", (event) => {
    if(power) {
        playerSequence.push(2);
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener("click", (event) => {
    if(power) {
        playerSequence.push(3);
        check();
        three();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener("click", (event) => {
    if(power) {
        playerSequence.push(4);
        check();
        four();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    if(playerSequence[playerSequence.length-1] !== sequence[playerSequence.length - 1]) {
        correct = false;
    }
    if(playerSequence.length == 20 && correct) {
        winGame();
    }
    if(!correct) {
        flashColor();
        level.innerHTML = "WRONG!!";
        setTimeout(() => {
            level.innerHTML = turn;
            clearColor();

            if(strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerSequence = [];
                correct = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        sound = false;
    }

    if(turn == playerSequence.length && correct && !win) {
        turn++;
        playerSequence = [];
        compTurn = true;
        flash = 0;
        level.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    level.innerHTML = "WIN!!!";
    power = false;
    win = true; 
}




