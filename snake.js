var unitSize = 30;
var canvasSize = 400;
var color = "green";

function draw() {
    document.createElement("canvas");
    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, unitSize, unitSize);
}

function square(size, x, y, color, type) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.type = type;
    this.move = function(x,y) {
        if (x>0)
        {
            this.x = (this.x + unitSize) % gameContext.canvas.width;
        } else if (x<0)
        {
            this.x = Math.abs((this.x - unitSize) % gameContext.canvas.width);
        } else if (y>0)
        {
            this.y = (this.y + unitSize) % gameContext.canvas.height;
        } else if (y<0)
        {
            this.y = Math.abs((this.y - unitSize) % gameContext.canvas.height);
        }
    }
}