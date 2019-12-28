window.onload = function()  
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth/blockSize;  //la largeur en terme de block sera la largeur divisée par la taille du bloc c'est à dire, la largeur est de 900px et la taille du bloc (blockSize) est de 30px ==> notre largeur en terme de blocks sera de 30px var 30*30=900
    var heightInBocks = canvasHeight/blockSize; //600/30 = 20

    init();

    function init()
    {
            var canvas = document.createElement('canvas');  //Canvas élément HTML qui permet de dessiner notre page HTML
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.border = "1px solid";
            document.body.appendChild(canvas);
            ctx = canvas.getContext('2d');
            snakee = new Snake( [[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
            applee = new Apple([10,10]);
            refreshCanvas();
    }   

    //fonction qui rafraichit le canvas
    function refreshCanvas()
    {
        snakee.advance();
        if(snakee.checkCollision())
        {
            //Game over
        }
        else
        {
            ctx.clearRect(0,0,canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }   
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
        this.checkCollision = function()   //Fonction pour délimiter l'espace du serpent ==> pour ne pas qu'il sorte du canvas sinon game over 
        {
            var wallCollision = false;  //si le serpent rentre dans le mur ==> les limites du canvas
            var snakeCollision = false; //si le serpent rentre sur lui-même
            var head =  this.body[0];   // c'est la tête qui prend la collision donc c'est cette partie que l'on vérifie
            var rest = this.body.slice(1);      //rest du corps du serpent en utilisant la fonction slice et autant qu'il passe sur la valeur 0 et va nous copier tout le reste dans ce array rest. 
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBocks - 1; 
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
            {
                wallCollision = true;
            }

            for(var i = 0; i < rest.length; i++)
            {
                if(snakeX === rest[i][0] && snakeY === rest[i][1])  //je vérifie si la tête du serpent est sur l'élément 0 ==>[i] et son X à lui [0] et je vérifie si la tête snakeX et l"élément du corps rest[i][0] ont le même X et le même Y ce qui voudrait dire que la tête du serpent est sur la même X qu'une des case du reste du serpent
                {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision; 
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
            var radius = blockSize/2;
            var x = position[0]*blockSize + radius;
            var y = position[1]*blockSize + radius;
            ctx.arc(x,y, radius, 0, Math.PI*2, true);    //Dessin du cercle
            ctx.fill();
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