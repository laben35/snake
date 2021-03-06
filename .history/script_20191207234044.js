window.onload = function()  
{

    var canvasWidth = 900;
    var canvasHeigth = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;

    init();

    function init()
    {
            var canvas = document.createElement('canvas');  //Canvas élément HTML qui permet de dessiner notre page HTML
            canvas.width = canvasWidth;
            canvas.height = canvasHeigth;
            canvas.style.border = "1px solid";
            document.body.appendChild(canvas);
            ctx = canvas.getContext('2d');
            snakee = new Snake([[6,4], [5,5] [4,4]]);
            refreshCanvas();
    }   

    //fonction qui rafraichit le canvas
    function refreshCanvas()
    {
        ctx.clearRect(0,0,canvasWidth, canvasHeigth);
        snakee.draw();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);

    }
    //fonction constructeur
    class Snake {
        constructor(body) {
            this.body = body;
            this.draw = function () {
                ctx.save();
                ctx.fillStyle = "#ff0000";
                for (var i = 0; i < this.body.length; i++)
                    ;
                {
                    drawBlock(ctx, this.body[i]);
                }
                ctx.restore();
            };
        }
    }
}