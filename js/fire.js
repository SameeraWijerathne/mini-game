class Banana {
    dy = Math.abs(Math.random() * 10);
    width = 40;
    height = this.width;
    y = 0;
    x = Math.random() * (innerWidth - this.width);
    elm;
    
    constructor(){
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.backgroundImage = `url('img/assets/banana.png')`;
        this.elm.style.backgroundSize = 'cover';
        this.elm.style.backgroundRepeat = 'no-repeat';
        this.elm.style.backgroundPosition = 'center';
        this.elm.style.left = `${this.x}px`;
        this.elm.style.top = `${this.y}px`;
        document.body.append(this.elm);
    }

    move(){
        this.y += this.dy;
        this.x = this.x;
        this.elm.style.top = `${this.y}px`;
        this.elm.style.left = `${this.x}px`;

        if (this.y >= innerHeight - this.height){
            this.y = 0;
            this.x = Math.random() * (innerWidth - this.width);
        }

        if (this.y > boxElm.offsetTop && this.y < boxElm.offsetTop + 150 && this.x > boxElm.offsetLeft && this.x < boxElm.offsetLeft + 150){
            bananaCount++;
            score.innerHTML = `Score: ${bananaCount}`;
            this.y = 0;
            this.x = Math.random() * (innerWidth - this.width);
        }
    }
}

class Fire {
    width = 40;
    height = this.width;
    x = Math.random() < 0.5 ? -this.width : innerWidth; 
    y = 698; 
    dx = Math.random() < 0.5 ? 2 : -2; 
    elm;

    constructor() {
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.backgroundImage = `url('img/assets/fire.gif')`;
        this.elm.style.backgroundSize = 'cover';
        this.elm.style.backgroundRepeat = 'no-repeat';
        this.elm.style.backgroundPosition = 'center';
        this.elm.style.left = `${this.x}px`;
        this.elm.style.top = `${this.y}px`;
        document.body.append(this.elm);
    }

    move() {
        this.x += this.dx;
        this.elm.style.left = `${this.x}px`;
        if ((this.dx > 0 && this.x > innerWidth) || (this.dx < 0 && this.x < -this.width)) {
            this.elm.remove();
            fireList = fireList.filter((fire) => fire !== this);
        }

        if ((this.x === boxElm.offsetLeft + boxElm.offsetWidth/2 - 15 || this.x === boxElm.offsetLeft + boxElm.offsetWidth/2 + 20) && boxElm.offsetTop + boxElm.offsetHeight >= this.y){
            clearInterval(timer1);
            timer1 = null;
            clearInterval(timer2);
            timer2 = null;
            clearInterval(timer3);
            timer3 = null;
            clearInterval(initialTimer1);
            initialTimer1 = null;
            clearInterval(initialTimer2);
            initialTimer2 = null;
            clearInterval(initialTimer3);
            initialTimer3 = null;
            doDead();
            
            gameOverWindow.classList.remove("animate__backOutLeft");
            gameOverWindow.style.visibility = 'visible';
            finalScore.innerText = `Your Score: ${bananaCount}`;
        }
    }
}

let bananaCount = 0;
let score = document.getElementById("score");
const gameOverWindow = document.getElementById("game-over-window");
const btnPlay = document.getElementById("btn-play");
const finalScore = document.getElementById("final-score");

let bananaList = [];
for(let i = 1; i < 5; i ++){
    bananaList.push(new Banana());
}

let fireList = [];
let timer1 = null;
let timer2 = null;
let timer3 = null;
let deadTimer = null;

function doDead(){
    let i = 1;
    boxElm.style.width = 220 + "px";
    deadTimer = setInterval(()=> {
        boxElm.style.backgroundImage = `url('img/Dead (${i++}).png')`;
        if(i === 9) {
            i = 1;
            clearInterval(deadTimer);
            deadTimer = null;
        }
    },(1000/20));
}
  
btnPlay.addEventListener("click", ()=> {
    gameOverWindow.classList.add("animate__backOutLeft");
    score.innerHTML = `Score: 0`;
    bananaCount = 0;
    resetGame();
    startGame();
    moveParticles();
    
});

function moveParticles(){

    timer1 = setInterval(()=>{bananaList.forEach(elm => elm.move())},20);

    timer2 = setInterval(() => {
        fireList.push(new Fire());
    }, 4000);

    timer3 = setInterval(() => {
        fireList.forEach((fire) => fire.move());
    }, 10);
}

function resetGame() {
    bananaList.forEach(banana => {
        banana.y = 0;
        banana.x = Math.random() * (innerWidth - banana.width);
        banana.elm.style.top = `${banana.y}px`;
        banana.elm.style.left = `${banana.x}px`;
    });

   
    fireList.forEach(fire => fire.elm.remove());
    fireList = [];

    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
    clearInterval(initialTimer1);
    clearInterval(initialTimer2);
    clearInterval(initialTimer3);
    clearInterval(deadTimer);
}

moveParticles();

