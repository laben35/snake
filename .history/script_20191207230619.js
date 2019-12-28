window.onload = function()  
{

    var canvas;
    var ctx;
    var delay = 1000;

    function init()
    {
        var canvas = document.createElement('canvas');  //Canvas élément HTML qui permet de dessiner notre page HTML
            canvas.width = 900;
            canvas.height = 600;
            canvas.style.border = "1px solid";
            this.document.body.appendChild(canvas);

            var ctx = canvas.getContext('2d');
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(30, 30, 100, 50);  
        }   
    
        //fonction qui rafraichit le canvas
        function refreshCanvas()
        {
            
        }
}