const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;
const startBtn = document.querySelector(".btn-start");
const cols = Math.floor(board.clientWidth/ blockWidth);
const rows = Math.floor(board.clientHeight/blockHeight);
let intervalId = null;
const blocks = [];
let snake=[{x:1, y:3}];
let direction='down';
let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
const restartBtn = document.querySelector(".btn-restart");

let score = document.querySelector(".score");
let highScore = document.querySelector(".hiscore");
let counter=0;
let highScoreCounter = 0;



for (let row = 0;row<rows;row++){
    for(let col=0; col<cols;col++){
        const block = document.createElement("div");
        block.classList.add("block");
        
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

startBtn.addEventListener("click", ()=>{
    intervalId=setInterval(() => {render()},100);
    document.querySelector(".modal").style.display = "none";
    score.textContent=counter;
})

restartBtn.addEventListener("click", restartGame);

function restartGame() {
    document.querySelector(".game-over").style.display = "none";
    document.querySelector(".modal").style.display = "none";
    snake=[{x:1, y:3}];
    direction='down';
    blocks[ `${food.x}-${food.y}` ].classList.remove("food");
    Object.values(blocks).forEach(function(block){
    block.classList.remove("fill", "food");
    counter = 0;
    score.textContent=counter;
});
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
    
    intervalId=setInterval(() => {render()},100);
    

}

function render(){   
    
     blocks[  `${food.x}-${food.y}` ].classList.add("food");
          
    let head = null;
     if(direction=='right'){
        head = {x:snake[0].x, y:snake[0].y+1}
     }
     else if(direction=='left'){
        head = {x:snake[0].x, y:snake[0].y-1}
     }
     else if(direction=='down'){
        head = {x:snake[0].x+1, y:snake[0].y}
     }
     else if(direction=='up'){
        head = {x:snake[0].x-1, y:snake[0].y}
     }

    snake.forEach(function(val){
        if(head.x==val.x && head.y==val.y){
            clearInterval(intervalId);
        document.querySelector(".modal").style.display = "flex";
        document.querySelector(".start-game").style.display="none";
        document.querySelector(".game-over").style.display="flex";
        return;
        }
    })

     if(head.x<0||head.x>=rows || head.y<0 || head.y>=cols){
        // document.querySelector(".game-over").style.display = "block";
        clearInterval(intervalId);
        document.querySelector(".modal").style.display = "flex";
        document.querySelector(".start-game").style.display="none";
        document.querySelector(".game-over").style.display="flex";
        return;
     }

     if(head.x==food.x && head.y==food.y){

            blocks[ `${food.x}-${food.y}` ].classList.remove("food");
            
            if(highScoreCounter==counter){
                    highScoreCounter++;
            }
            counter++;
            score.textContent = `Score: ${counter}`;
            highScore.textContent = `High Score: ${highScoreCounter}`;
            food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
            blocks[ `${food.x}-${food.y}` ].classList.add("food");
            snake.unshift(head);

     }

     snake.forEach(function(val){
        blocks [ `${val.x}-${val.y}`].classList.remove("fill");
     })

     snake.unshift(head);
     let last = snake.pop();

     snake.forEach(function(val){
          blocks [`${val.x}-${val.y}`].classList.add("fill"); 
    })
     
    
}


addEventListener("keydown",(event)=>{
    console.log(event.key);

    if(event.key=="ArrowUp"){
        direction="up";
    }
    else if(event.key=="ArrowDown"){
        direction="down";
    }
    else if(event.key=="ArrowRight"){
        direction="right";
    }
    else if(event.key=="ArrowLeft"){
        direction="left";
    }
})