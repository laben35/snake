window.onload = function()  
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize
    var ctx;
    var delay = 100;
    var xCoord = 0;
    var yCoord = 0;

    init();

    function init()
    {
            canvas = document.createElement('canvas');  //Canvas élément HTML qui permet de dessiner notre page HTML
            canvas.width = 900;
            canvas.height = 600;
            canvas.style.border = "1px solid";
            document.body.appendChild(canvas);
            ctx = canvas.getContext('2d');
            refreshCanvas();
    }   

    //fonction qui rafraichit le canvas
    function refreshCanvas()
    {
        xCoord += 5;
        yCoord += 5;
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord, yCoord, 100, 50);
        setTimeout(refreshCanvas, delay);
    }

    
}