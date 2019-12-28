window.onload = function()  
{

    var canvasWidth = 900;
    var canvasHeigth = 600;
    var blocksize = 30;
    var ctx;
    var delay = 100;
    var snakee;

    init();

    function init()
    {
            canvas = document.createElement('canvas');  //Canvas élément HTML qui permet de dessiner notre page HTML
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
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(xCoord, yCoord, 100, 50);

            snakee.draw();
            setTimeout(refreshCanvas, delay);
        }

        //fonction constructeur
        function Snake(body)
        {
            this.body = body;
            this.draw = function()
            {
                ctx.save();
                ctx.fillStyle = "#ff0000";
                for(var i = 0; i < this.body.length; i++);
                {
                    drawBlock(ctx, this.body[i]);
                }
                ctx.restore();    
            };
        }
}