const clockFace = document.querySelector('.clock-face');
const docFrag = document.createDocumentFragment();

for(let i = 0; i < 12; ++i){
  const hourMark = document.createElement('div');
  hourMark.classList.add('hand', 'hour-mark');
  hourMark.style.transform = `rotate(${i * 30}deg) translate(400%)`;
  docFrag.appendChild(hourMark);
}

clockFace.appendChild(docFrag);

const secHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hrHand = document.querySelector('.hour-hand');

let lastSecs = 60;

function updateClock(){

  const time = new Date();
  const secs = time.getSeconds();

  if(secs < lastSecs){
    secHand.style.transitionDuration = "0s";
  } else{
    secHand.style.transitionDuration = "0.12s";
  }

  lastSecs = secs;

  const secondsRot = (secs * 6) + 90;
  secHand.style.transform = `rotate(${secondsRot}deg)`;

  const mins = time.getMinutes();
  const minutesRot = (mins * 6) + (secs / 10) + 90;
  minHand.style.transform = `rotate(${minutesRot}deg)`;

  const hrs = time.getHours();
  const hoursRot = (hrs * 30) + (mins / 2) + 90;
  hrHand.style.transform = `rotate(${hoursRot}deg)`;
}

updateClock();

setInterval(updateClock, 1000);
