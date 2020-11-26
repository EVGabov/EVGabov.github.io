let
    time,
    level,
    timer;


function timeTick() {
    document.getElementById("timeText").innerHTML = time;
    if (time === 0) {
        lose();
    }
    document.getElementById("timeText").innerHTML = time;
    time--;
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function squareSplit() {
    const
        hue = rand(0, 360),
        saturation = 100,
        lightness = 50,
        squareCount = (level+1) * (level+1),
        gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    gameField.style.gridTemplateColumns = `repeat(${(level+1).toString()}, 1fr)`;

    const
        mainColor = "hsl(" + hue.toString() + ", " + saturation.toString() + "%, " + lightness.toString() + "%)",
        semiColor = "hsl(" + hue.toString() + ", " + (saturation - saturation/level).toString() + "%, " + (lightness - lightness/level).toString() + "%)",
        randomSquare = rand(0, squareCount);

    for (let i = 0; i < squareCount; i++) {

        let square = document.createElement('div');
        square.className = 'square';
        
        if (i === randomSquare) {
            square.style.backgroundColor = semiColor;
            square.id = "semiSquare";
        } else {
            square.style.backgroundColor = mainColor;
            square.id = "mainSquare" + i.toString();
        }

        square.onclick = squareClick;
        gameField.appendChild(square);
    }
}

function lose() {
    clearInterval(timer);
    let gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    alert(`Вы проиграли! Вы достигли ${level.toString()} уровня.`);

    level = 0;
    timer = 40;


}

function squareClick() {
    if (this.id === "semiSquare") {
        level++;
        document.getElementById("level").innerHTML = level;
        squareSplit();
    }
    else {
        lose();
    }
}

function startGame() {
    time = 40;
    level = 1;
    document.getElementById("level").innerHTML = level;
    squareSplit();
    timer = setInterval(timeTick, 1000); 
}
