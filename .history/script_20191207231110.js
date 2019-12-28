window.onload = function()  
{

    var canvas;
    var ctx;
    var delay = 1000;
    xCoord = 0;
    yCoord = 0;

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
            xCoord += 2;
            yCoord += 2;
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(xCoord, yCoord, 100, 50);
        }
}