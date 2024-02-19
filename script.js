const gameContainer = document.getElementById('gameContainer');
const bird = document.getElementById('bird');

let birdLeft = 50;
let birdBottom = 50;
let gravity = 1.5;
let isGameOver = false;
let minGap = 90;
let maxGap = 150;

function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
}

let gameTimerId = setInterval(startGame, 20);

function control(e) {
    if (e.keyCode === 32) {
        jump();
    }
}

function jump() {
    if (birdBottom < 500) birdBottom += 40;
    bird.style.bottom = birdBottom + 'px';
}

document.addEventListener('keyup', control);

function generatePipe() {
    let pipeLeft = 500;
    let randomHeight = Math.floor(Math.random() * (300 - 100 + 1) + 100);
    let pipeBottom = randomHeight - 150;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    const pipe = document.createElement('div');
    const topPipe = document.createElement('div');
    if (!isGameOver) {
        pipe.classList.add('pipe');
        topPipe.classList.add('pipe', 'pipe-top');
    }
    gameContainer.appendChild(pipe);
    gameContainer.appendChild(topPipe);
    pipe.style.left = pipeLeft + 'px';
    topPipe.style.left = pipeLeft + 'px';
    pipe.style.height = pipeBottom + 'px';
    topPipe.style.height = 600 - pipeBottom - gap + 'px';

    function movePipe() {
        pipeLeft -= 2;
        pipe.style.left = pipeLeft + 'px';
        topPipe.style.left = pipeLeft + 'px';

        if (pipeLeft === -80) {
            clearInterval(timerId);
            gameContainer.removeChild(pipe);
            gameContainer.removeChild(topPipe);
        }


    if (
            pipeLeft < birdLeft + 10 && pipeLeft + 10 > birdLeft &&
            (birdBottom < pipeBottom + 5|| birdBottom + 5 > pipeBottom + gap)
        ) {
            gameOver();
            clearInterval(timerId);
        }    
    }
    let timerId = setInterval(movePipe, 20);
    if (!isGameOver) setTimeout(generatePipe, 3000);
}

generatePipe();

function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
    alert('Game Over!');
}
