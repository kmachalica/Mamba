const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 500;

//Pajączek
const spider = {
    x: 10,
    y: 10,

    draw: function()
    {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.x,this.y,8,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    },

    move: function(distanceX = 0,distanceY = 0)
    {
        this.x+=distanceX;
        this.y+=distanceY; 
    }
}


//Wąż
const snake = {
    x: 250,
    y: 250,
    velX: 5,
    velY: 0,

    
}


//Functions

function currentBoard(){
    
    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#999";
        ctx.fillRect(25,25,canvas.width-50,canvas.height-50)
        spider.draw()
    },20)
    
    
}


currentBoard();
window.onkeydown = (e)=>{
    let distanceX,distanceY;
    switch(e.key){
        case "ArrowLeft": distanceX = -5; break;
        case "ArrowRight": distanceX = 5; break;
        case "ArrowDown": distanceY = 5; break;
        case "ArrowUp": distanceY = -5; break;
        default: distanceX = 0; distanceY = 0;
    }

    spider.move(distanceX,distanceY)
}

