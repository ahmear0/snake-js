var ctx;
var unitSize = 20;
var canvasWidth = 400;
var canvasHeight = 400;
var snake;
var snakeColor = '#49B02B';
var raf;

function start() {
    ctx = document.getElementById("gameCanvas").getContext("2d");
    snake = new Square(unitSize, 40, 40, snakeColor, 'snake');
    updateScreen();
}

function Square(size, x, y, color, type) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;

    this.update = function () {
        this.ctx = document.getElementById("gameCanvas").getContext("2d");
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = color;
        ctx.fillRect(snake.x, snake.y, unitSize, unitSize, 'snake');
        this.printSquare();
    }
    this.printSquare = function () {
        console.log(`${this.type} was made at ` + this.x + ", " + this.y);
    }
}

function updateScreen() {
    snake.update();
    raf = window.requestAnimationFrame(updateScreen);
}

function move(x, y) {
    if (x > 0) {
        snake.x = (snake.x + unitSize) % canvasWidth;
    } else if (x < 0) {
        if (snake.x - unitSize < 0)
            snake.x = canvasWidth - unitSize;
        else
            snake.x = Math.abs((snake.x - unitSize) % canvasWidth);
    } else if (y > 0) {
        snake.y = (snake.y + unitSize) % canvasHeight;
    } else if (y < 0) {
        if (snake.y - unitSize < 0)
            snake.y = canvasHeight - unitSize;
        else
            snake.y = Math.abs((snake.y - unitSize) % canvasHeight);
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        move(-1, 0);
    } else if (event.key === 'ArrowDown') {
        move(0, 1);
    } else if (event.key === 'ArrowRight') {
        move(1, 0);
    } else if (event.key === 'ArrowUp') {
        move(0, -1);
    }
});