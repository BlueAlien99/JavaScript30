let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const btns = document.querySelectorAll('[data-time]');

function timer(secs){
  const now = Date.now();
  const then = now + secs * 1000;

  clearInterval(countdown);

  displayTimeLeft(secs);
  displayEndTime(then);

  countdown = setInterval(() => {
    const left = Math.round((then - Date.now()) / 1000);
    displayTimeLeft(left);
    if(left <= 0){
      clearInterval(countdown);
    }
  }, 1000);
}

function displayTimeLeft(secs){
  const mins = Math.floor(secs / 60);
  const secsMod = secs % 60;
  const msg = `${mins}:${secsMod.toString().padStart(2, '0')}`;
  document.title = msg;
  timerDisplay.textContent = msg;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const paddedMins = end.getMinutes().toString().padStart(2, '0');
  endTime.textContent = `Be back at ${end.getHours()}:${paddedMins}`;
}

btns.forEach(b => b.addEventListener('click', function(){
  timer(this.dataset.time);
}));

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.minutes.blur();
  this.reset();
});