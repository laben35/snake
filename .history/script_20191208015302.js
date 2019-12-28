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
                    nextPosition[0] -= 1;    //ici c'est la position du x
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;   //ici c'est la position du y
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw("Invalid Direction");             
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function(newDirection)
        {
            var allowedDirections;
            switch(this.direction)
            {
                case "left":   
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");       
            }
            if(allowedDirections.indexOf(newDirection) > -1)   //Si c'est >-1 alors ma nouvelle direction est permise
            {
                this.direction = newDirection;
            }
        };     
    }

    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";   // couleur de la pomme
            ctx.beginPath();    //dessin de la pomme qui est ronde donc on utilise radius
            var radius

            ctx.restore();
        };
    }

    document.onkeydown = function handleKeyDown(e)   //évènement
    {
        var key = e.keyCode;      //Nous donne le code de la touche qui a été appuyée
        var newDirection;        //nouvelle direction en fonction de la touche qui a été appuyée
        switch(key)             //swith sur la touche appuyée
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
                default:
                    return;                  
        }
        snakee.setDirection(newDirection);
    }
    
}