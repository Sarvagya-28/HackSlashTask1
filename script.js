let body= document.querySelector("body");
let level= document.querySelector("h3");
let playground= document.querySelector(".playground");
let boxes= document.querySelectorAll(".box");
let btn = document.querySelector(".help");

let started= false;
let memArr = [];
let userArr = [];
let levelNum = 0;

let num = 0;
let clicks = 0;
let score = 0;

playground.addEventListener("click", (event) => {
    if(started){
        if(event.target.className == "box"){
            userFlash(event.target);
            clicks++;
            //console.log(clicks);
            userArr.push(event.target.id);
            console.log(memArr);
            console.log(userArr);
            check();

        }
    }
})

function userFlash(box){
    box.classList.add('userFlash')

    setTimeout(() => {
        //remove class
        box.classList.remove('userFlash');
    }, 200)
}

function check() {
    //userArr = [1] .. [1,2] .. [1,2,3] .. [1,2,3,4]
    //memArr = [1,2,3,4, ..]
    //clicks = 1
    //num = 0
    if(userArr[clicks-1] != memArr[clicks-1]){
        //lost
        level.innerText= `You have lost the game, Your score is ${score}`;
        started= false;
        clicks= 0;
        userArr =[];
        memArr =[];
        num= 0;

        body.classList.add('gameOver');
        setTimeout(() => {
            body.classList.remove('gameOver');
        }, 500);

        levelNum= 1;
    }else{
        num++;
        //num = 1
    }

    if(num == memArr.length && num!= 0){
        // user clicked all the boxes in correct sequence
        score+=10;
        userArr=[];
        clicks=0;
        num=0;

        setTimeout(selectBox, 500);
    }
}

body.addEventListener("keydown", () => {
    if(started == false){
        started=true;
        selectBox();
    }
})

function selectBox(){
    level.innerText= `Level ${levelNum}`;
    levelNum++;

    let randomVal = Math.floor(Math.random()*4);
    flashBox(randomVal);

    memArr.push(boxes[randomVal].id);
}

function flashBox(randomVal){
    boxes[randomVal].classList.add('memFlash');

    setTimeout(() => {
        boxes[randomVal].classList.remove('memFlash');
    }, 250)

}

btn.addEventListener('click', () => {
    let initialText = level.innerText;

    level.innerText =`Memory Array is : ${memArr}`;

    setTimeout(() => {
        level.innerText = initialText;
    },2000)
})