window.onload = function()  
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;

    init();

    function init()
    {
            var canvas = document.createElement('canvas');  //Canvas élément HTML qui permet de dessiner notre page HTML
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.border = "1px solid";
            document.body.appendChild(canvas);
            ctx = canvas.getContext('2d');
            snakee = new Snake( [[6,4], [5,4], [4,4]], "right");
            refreshCanvas();
    }   

    //fonction qui rafraichit le canvas
    function refreshCanvas()
    {

        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x,y, blockSize, blockSize);
    }

    //Le constructeur
    function Snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++)
           {
               drawBlock(ctx, this.body[i]);
           }
           ctx.restore();  
        };
        this.advance = function()
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextPosition[0] -= 1;
                case "right":
                    nextPosition[0] += 1;
                case "down":
                    nextPosition[0] += 1;
                case "up":
                    nextPosition[0] -= 1;           
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection(newDirection)
        {
            var allowedDirections;
            
        };
    }

    document.onkeydown = function handleKeyDown(e)
    {
        var key = e.keyCode;
        var newDirection;
        switch(key)
        {
            case 37:   //flèche qui va à gauche
                newDirection = "left";
                break;
            case 38:   //flèche qui va en haut
                newDirection = "up";
                break;
            case 39:   //flèche qui va à droite
                newDirection = "right";
                break;
            case 40:    //flèche qui va en bas
                newDirection = "down";
                break;            
        }
    }
    
}