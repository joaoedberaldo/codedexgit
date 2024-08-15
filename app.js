const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause'); 
const resetBtn = document.querySelector('.btn-reset'); 
const session = document.querySelector('.minutes'); 
const errorMsg = document.getElementById('error');

let myInterval; 
let state = true;
let paused = false;

let minuteDiv = document.querySelector('.minutes');
let secondDiv = document.querySelector('.seconds');
let totalSeconds;

const errorUpdate = () => {
  errorMsg.innerText = "";
}
//every 10s, clear the error msg
setInterval(errorUpdate,4000);

const updateSeconds = () => {
  totalSeconds = Number.parseInt((minuteDiv.textContent*60))+Number.parseInt(secondDiv.textContent);
  totalSeconds--;

  let minutesLeft = Math.floor(totalSeconds/60);
  let secondsLeft = totalSeconds % 60;

  if(secondsLeft < 10) {
    secondDiv.textContent = '0' + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }
  minuteDiv.textContent = `${minutesLeft}`

  if(minutesLeft === 0 && secondsLeft === 0) {
    bells.play()
    clearInterval(myInterval);
  }
}

const appTimer = () => {
  if(state) {
    //if not started, do this
    state = false;
    errorMsg.innerText = "";
    myInterval = setInterval(updateSeconds, 1000);
  }  else {
    //if started, do this
    errorMsg.innerText += "Session has already started. \n"; 
  }
}

//code for reset
const appResetTimer = () =>{
  minuteDiv.textContent = "25";
  secondDiv.textContent = "00";
  pauseBtn.textContent = "pause";
  errorMsg.innerText = "";
  paused = false;
  state = true;
  clearInterval(myInterval);
}

const appPauseTimer = () =>{
    if(state == false) {
      if(paused == false){
        //code for pause
        paused = true;
        pauseBtn.textContent = "resume";
        clearInterval(myInterval);
      } else {
        //code for resume
        paused = false;
        pauseBtn.textContent = "pause";
        myInterval = setInterval(updateSeconds, 1000);
      }
    } else {
    errorMsg.innerText += "Session must be started. \n"; 
    }
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', appPauseTimer);
resetBtn.addEventListener('click', appResetTimer);