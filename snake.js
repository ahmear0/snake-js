var ctx;
const unitSize = 20;
const canvasWidth = 400;
const canvasHeight = 400;
var snake;
var apple;
var snakeSquares = [];
var snakeColor = '#49B02B';
const defaultDirection = 'left';
var raf;
var go = false;
var interval;
var initialTime, currentTime, elapsedTime;
const fps = 15;

function start() {
    showHeader();
    ctx = document.getElementById("gameCanvas").getContext("2d");
    snake = new Square(unitSize, 40, 40, snakeColor, 'snake');
    snake.update();
    snakeSquares.push(snake);
    let rand = getRandomLocation();
    apple = new Square(unitSize, rand[0], rand[1], 'black', 'apple');
    apple.update();
    animateWithDelay(fps);
}

function showHeader() {
    document.getElementById("header").innerHTML = "Welcome Message";
}

function Square(x, y, color, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;

    if (type === 'snake') {
        this.color = snakeColor;
        this.direction = defaultDirection;
        this.changeDirection = function (newDirection) {
            this.direction = newDirection;
        }
    }

    this.update = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, unitSize, unitSize, type);
        this.printSquare();
    }
    this.printSquare = function () {
        console.log(`${this.type} was made at ` + this.x + ", " + this.y);
    }
}

function animateWithDelay(fps) {
    interval = 1000 / fps;
    initialTime = window.performance.now();
    updateScreen();
}

function updateScreen() {
    raf = window.requestAnimationFrame(updateScreen);

    currentTime = window.performance.now();
    elapsedTime = currentTime - initialTime;

    if (elapsedTime > interval) {
        initialTime = window.performance.now();
        for (part in snakeSquares) {
            snakeSquares[part].update();
        }
        if (go) {
            move();
        } else {
            console.log("game is stopped.")
        }
    }
}

function getRandomLocation() {
    let x = parseInt(Math.random() * (canvasWidth - unitSize) / unitSize) * unitSize;
    let y = parseInt(Math.random() * (canvasHeight - unitSize) / unitSize) * unitSize;
    return [x, y];
}

function getNextLocation(direction) {
    if (direction === 'right') {
        snake.x = (snake.x + unitSize) % canvasWidth;
    } else if (direction === 'left') {
        if (snake.x - unitSize < 0)
            snake.x = canvasWidth - unitSize;
        else
            snake.x = Math.abs((snake.x - unitSize) % canvasWidth);
    } else if (direction === 'down') {
        snake.y = (snake.y + unitSize) % canvasHeight;
    } else if (direction === 'up') {
        if (snake.y - unitSize < 0)
            snake.y = canvasHeight - unitSize;
        else
            snake.y = Math.abs((snake.y - unitSize) % canvasHeight);
    }
    return [snake.x, snake.y];
}

function move() {
    [snake.x, snake.y] = getNextLocation(snake.direction);
    snakeSquares.push(new Square(unitSize, snake.x, snake.y, snakeColor, 'snake'));
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        snake.direction = 'left';
    } else if (event.key === 'ArrowDown') {
        snake.direction = 'down';
    } else if (event.key === 'ArrowRight') {
        snake.direction = 'right';
    } else if (event.key === 'ArrowUp') {
        snake.direction = 'up';
    } else if (event.key === '1') { //start drawing in the canvas
        go = true;
        updateScreen();
    } else if (event.key === '2') { //stop drawing
        go = false;
    }
});

function changeHue(currentColor, choice) {
    const hueLimit = 256;
    var r = parseInt(currentColor[1] + currentColor[2], 16);
    var g = parseInt(currentColor[3] + currentColor[4], 16);
    var b = parseInt(currentColor[5] + currentColor[6], 16);

    if (choice === 'r') {
        r = (r + 1) % hueLimit;
    } else if (choice === 'g') {
        g = (g + 1) % hueLimit;
    } else if (choice === 'b') {
        b = (b + 1) % hueLimit;
    }
    return '#' + pad(r.toString(16)) + pad(g.toString(16)) + pad(b.toString(16));

    function pad(string) {
        if (string.length === 1)
            return '0' + string;
        return string;
    }
}