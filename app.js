const board = document.getElementById('playground');




class SnakeTile{
    constructor(x,y,velX,velY,direction,pos){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.direction = direction
        this.div = document.createElement('div');
        this.div.classList.add('snakeTile');
        if(pos==1){this.div.style.borderRadius = "50% 0% 0% 50%"; this.div.style.backgroundColor = "#1ff1ff"}
        this.div.style.left = this.x+"px";
        this.div.style.top = this.y+"px";
        board.appendChild(this.div)
    }

    move()
    {

        if((this.changePositionX||this.changePositionX==0) && this.changePositionX==this.x && this.changePositionY==this.y)
            {
                if(this.newDirection == "u"){this.velX = 0; this.velY = -5; this.direction = "u"}
                else if(this.newDirection == "d"){this.velX = 0; this.velY = 5; this.direction = "d"}
                else if(this.newDirection == "l"){this.velX = -5; this.velY = 0; this.direction = "l"}
                else if(this.newDirection =="r"){this.velX = 5; this.velY = 0; this.direction = "r"}
               /* switch(this.newDirection)
                {
                    case "u": this.velX = 0; this.velY = -5; this.direction = "u"; break;
                    case "d": this.velX = 0; this.velY = 5; this.direction = "d"; break;
                    case "l": this.velX = -5; this.velY = 0; this.direction = "l"; break;
                    case "r": this.velX = 5; this.velY = 0; this.direction = "r"; break;

                    default: alert("SOmeting wrong"+this.changeDirection)
                }*/

                this.newDirection = null; this.changePositionX = null; this.changePositionY = null;
            }
        
        else{
            console.log(this.x,this.y,this.changePositionX,this.changePositionY,this.newDirection,this.direction)
            if(this.x+this.velX<0||this.x+this.velX+5>650){
                if(snake.indexOf(this)==0){
                    if(this.y+10>450){this.direction = chooseDirection(['u'])}
                    else if(this.y-5<0){this.direction = chooseDirection(['d'])}
                    else {this.direction = chooseDirection(['u','d'])}
                }
                else{this.direction = snake[snake.indexOf(this)-1].direction}
                
                this.changeDirection()
           
            }   
            else if(this.y+this.velY<0||this.y+this.velY+5>450)
            {
                if(snake.indexOf(this)===0)
                {
                    if(this.x-5<0){this.direction = chooseDirection(['r'])}
                    else if(this.x+10>650){this.direction = chooseDirection(['l'])}
                    else{this.direction = chooseDirection(['r','l'])}
                }
                else{this.direction = snake[snake.indexOf(this)-1].direction}
    
                this.changeDirection()
            }
        }
        
        
        
        this.x+=this.velX;
        this.y+=this.velY;
        this.div.style.left = this.x+"px";
        this.div.style.top = this.y+"px";
    }

    changeDirection()
    {
        switch(this.direction)
        {
            case "u": this.velX = 0; this.velY = -5; break;
            case "d": this.velX = 0; this.velY = 5; break;
            case "r": this.velX = 5; this.velY = 0; break;
            case "l": this.velX = -5; this.velY = 0; break;

            default: alert('Something is wrong!: '+this.direction)
        }
    }
}

function chooseDirection(directions)
{
    const num = Math.floor(Math.random()*directions.length);
    return directions[num]
}

const snake = []            //tile od snake tu będą trzymane




function createSnake()
{
    for(let i = 0; i < 5; i++)
    {
        let newSnake = new SnakeTile(100+i*5,100,-5,0,'l',i+1);
        snake.push(newSnake)
    }
}
let changeDirectionInterval;

function directionInterval(...args)
{
    
    if(args[0]==0){
        
        clearInterval(changeDirectionInterval)
    }
    else if(args[0]==1){
        changeDirectionInterval = setInterval(()=>{
            clearInterval(moveInterval)
            let currentDirection = snake[0].direction;
            let newDirection;
            
           while(checkIfItIsPossible(newDirection)){
               console.log(currentDirection)
            switch(currentDirection)
            {
                case 'd': newDirection = chooseDirection(['l','r','d']); break;
                case 'u': newDirection = chooseDirection(['l','r','u']); break;
                case 'l': newDirection = chooseDirection(['u','d','l']); break;
                case 'r': newDirection = chooseDirection(['u','d','r']); break;

                default: alert('Something is wrong'+ currentDirection)
            }
           }
            
            switch(newDirection){
                case "d": snake[0].velX = 0; snake[0].velY = 5; snake[0].direction = newDirection; break;
                case "u": snake[0].velX = 0; snake[0].velY = -5; snake[0].direction = newDirection; break;
                case "r": snake[0].velX = 5; snake[0].velY = 0; snake[0].direction = newDirection; break;
                case "l": snake[0].velX = -5; snake[0].velY = 0; snake[0].direction = newDirection; break;
            }

            snake.forEach((tile,index)=>{
                if(index!=0){
                    tile.changePositionX = snake[0].x;
                    tile.changePositionY = snake[0].y;
                    tile.newDirection = newDirection;
                }
            });
            moveInterval =  setInterval(()=>{
                snake.forEach(tile=>tile.move())
            },20)
            snake.forEach(element=>console.log(element.x,element.y,element.direction,element.newDirection))
        },1400)
    }
}

function checkIfItIsPossible(direction){
    if(!direction){return true}
    else{
        if(snake[0].x+50 > 650 && direction == "r"){return true}
        else if(snake[0].x -50 < 0 && direction == "l"){return true}
        else if(snake[0].y +50 > 450 && direction == "d"){return true}
        else if(snake[0].y - 50 < 0 && direction == "u"){return true}
        else{return false}
    }
}

let moveInterval =  setInterval(()=>{
    snake.forEach(tile=>tile.move())
},20)
createSnake()
/*let moveInterval = setInterval(()=>{
    snake.forEach(tile=>tile.move())
},20)*/

directionInterval(1)

let interv = setInterval(()=>{
    if(Math.abs(snake[0].x-snake[1].x)>20||Math.abs(snake[0].y-snake[1].y)>20)
    {
        directionInterval(0);
        clearInterval(moveInterval)
    }
},20)



