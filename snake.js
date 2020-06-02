var ctx;
var unitSize = 20;
var canvasWidth = 400;
var canvasHeight = 400;
var snake;
var snakeSquares = [];
var snakeColor = '#49B02B';
var raf;

function start() {
    ctx = document.getElementById("gameCanvas").getContext("2d");
    snake = new Square(unitSize, 40, 40, snakeColor, 'snake');
    snakeSquares.push(snake);
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
        ctx.fillStyle = color;
        ctx.fillRect(snake.x, snake.y, unitSize, unitSize, 'snake');
        this.printSquare();
    }
    this.printSquare = function () {
        console.log(`${this.type} was made at ` + this.x + ", " + this.y);
    }
}

function updateScreen() {
    for (part in snakeSquares) {
        snakeSquares[part].update();
    }
    raf = window.requestAnimationFrame(updateScreen);
}

function move(direction) {
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
    snakeSquares.push(new Square(unitSize, snake.x, snake.y, snakeColor, 'snake'));
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        move('left');
    } else if (event.key === 'ArrowDown') {
        move('down');
    } else if (event.key === 'ArrowRight') {
        move('right');
    } else if (event.key === 'ArrowUp') {
        move('up');
    } else if (event.key === 's') { //stop drawing in the canvas
        stop = true;
    } else if (event.key === 'g') {
        stop = false;
        updateScreen();
    }
});