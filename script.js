const gameContainer = document.getElementById('gameContainer');
const bird = document.getElementById('bird');

let birdLeft = 200;
let birdBottom = 300;
let gravity = 2;
let isGameOver = false;
let gap = 430;

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
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
}

document.addEventListener('keyup', control);

function generatePipe() {
    let pipeLeft = 500;
    let randomHeight = Math.floor(Math.random() * (300 - 100 + 1) + 100); // Random height between 100 and 300
    let pipeBottom = randomHeight - 150; // Adjust bottom position based on random height
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
    topPipe.style.height = 600 - pipeBottom - gap + 'px'; // Adjust top pipe height based on bottom pipe

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
            pipeLeft > 160 && pipeLeft < 240 && birdLeft === 200 &&
            (birdBottom < pipeBottom + gap - 200 || birdBottom > pipeBottom + gap - 150) || // Adjust collision detection
            birdBottom === 0
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
