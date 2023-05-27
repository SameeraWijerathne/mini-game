for(let i = 1; i <= 12; i++){
    const image = new Image();
    image.src  = `img/Jump (${i}).png`;
}
for(let i = 1; i <= 10; i++){
    const image = new Image();
    image.src  = `img/Idle (${i}).png`;
}
for(let i = 1; i <= 10; i++){
    const image = new Image();
    image.src  = `img/Walk (${i}).png`;
}
for(let i = 1; i <= 8; i++){
    const image = new Image();
    image.src  = `img/Run (${i}).png`;
}

document.body.style.backgroundImage = `url('img/background/background.jpg')`;
document.getElementById("game-over-logo").setAttribute('src','img/assets/game-over.png');
document.getElementById("btn-play").setAttribute('src', 'img/assets/play.png');
const boxElm = document.createElement('div');
boxElm.classList.add('box');
document.body.append(boxElm);

let initialTimer1 = null;
let initialTimer2 = null;
let initialTimer3 = null;

let jump = false;
let run = false;
let runFast = false;
let dx = 0;
let runRight = false;
let runLeft = false;

function startGame(){
    boxElm.style.left = window.innerWidth/2 - 70 + "px";
    
    document.body.addEventListener('keydown', (eventData)=>{
        if (eventData.code === 'Space'){
            jump = true;
        } else if (eventData.code === 'ArrowRight' || eventData.code === 'KeyD'){
            // run = true;
            runRight = true;
            boxElm.style.transform = 'rotateY(0deg)';
            dx = 2;
        } else if (eventData.code === 'ArrowLeft' || eventData.code === 'KeyA'){
            // run = true;
            runLeft = true;
            boxElm.style.transform = `rotateY(180deg)`;
            dx = -2;
        } else if (eventData.code === 'ShiftLeft'){
            runFast = true;
            
        }    
    
    });
    
    
    document.body.addEventListener('keyup', (eventData)=>{
        if (eventData.code === 'ArrowRight' || eventData.code === 'KeyD' || eventData.code === 'ArrowLeft' || eventData.code === 'KeyA'){
            runRight = false;
            runLeft = false;
            dx = 0
        } else if (eventData.code === 'ShiftLeft'){
            runFast = false;
            dx = 0;
        }
    });

    initialTimer1 = setInterval(()=>{
        if (runRight && !runFast){
            dx = 2;
            doRun();
        }
        if (runRight && runFast){
            dx = 4;
            doRunFast();
        }
        if (runLeft && !runFast){
            dx = -2;
            doRun();
        }
        if (runLeft && runFast){
            dx = -4;
            doRunFast();
        }
    },5);
    
    initialTimer2 = setInterval(()=>{
        if (jump){
            doJump();
        }
    }, 30);
    
    initialTimer3 = setInterval(()=> 
    {
        if (runRight && !jump && !runFast){
            doRunImg();
        }
        if (runRight && runFast && !jump && !runLeft){
            doRunFastImg();
        }
        if (runLeft && !jump && !runFast){
            doRunImg();
        }
        if (runLeft && runFast && !jump && !runRight){
            doRunFastImg();
        }
        if (jump){
            dojumpImg();
        }
        if (!runRight && !jump && !runLeft){
            drawIdle();
        }
        
    }
    , (1000/20));
}

let s = 0;
let t = 0;
let u = 2.5; 
function doJump(){
    t++;
    let v = (u + (-0.2 * t));
    s = (u * t) + (-0.1 * t * t);
    s *=2;
    if (v > 0){
        boxElm.style.top = boxElm.offsetTop - s + "px";
    } else if (v < 0){
        boxElm.style.top = boxElm.offsetTop + s + "px";
    }   
    if (s <= 0){
        jump = false;
        t = 0; 
    } 
}

function doRun(){
    let x = boxElm.offsetLeft + dx;
    if ((x + boxElm.offsetWidth)> innerWidth) {
        x = innerWidth - boxElm.offsetWidth;
    }else if (x <= 0) x = 0;
    boxElm.style.left = `${x}px`;
   
}

function doRunFast(){
    let x = boxElm.offsetLeft + dx;
    if ((x + boxElm.offsetWidth)> innerWidth) {
        x = innerWidth - boxElm.offsetWidth;
    }else if (x <= 0) x = 0;
    boxElm.style.left = `${x}px`;
}

let i = 1;
function drawIdle(){
    boxElm.style.backgroundImage = `url('img/Idle (${i++}).png')`;
    if(i === 11) i = 1;
}

let j = 1;
function dojumpImg(){
    boxElm.style.backgroundImage = `url('img/Jump (${j++}).png')`;
    if (j === 13) j = 1;
}

let k = 1;
function doRunImg(){
    boxElm.style.backgroundImage = `url('img/Walk (${k++}).png')`;
    if (k === 11) k = 1;
}

let l = 1;
function doRunFastImg(){
    boxElm.style.backgroundImage = `url('img/Run (${l++}).png')`;
    if (l === 9) l = 1;
}

startGame();


