const player = document.querySelector('.player');

const video = player.querySelector('video');
const progressBar = player.querySelector('.progress');
const progressBarFilled = player.querySelector('.progress__filled');
const playBtn = player.querySelector('.player__button.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skipBtns = player.querySelectorAll('button[data-skip]');
const fsBtn = player.querySelector('.player__button.fullscreen');

function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updatePlayBtn(){
  const icon = this.paused ? '►' : '❚ ❚';
  playBtn.textContent = icon;
}

function updateProgressBar(){
  progress = (video.currentTime / video.duration) * 100;
  progressBarFilled.style.flexBasis = `${progress}%`;
}

function seek(e){
  const time = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = time;
}

function sliderUpdate(){
  video[this.name] = this.value;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function toggleFullscreen(){
  if(document.fullscreenElement){
    document.exitFullscreen();
  } else{
    player.requestFullscreen();
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updatePlayBtn);
video.addEventListener('play', updatePlayBtn);
video.addEventListener('timeupdate', updateProgressBar);

playBtn.addEventListener('click', togglePlay);

progressBar.addEventListener('click', seek);
progressBar.addEventListener('mousemove', e => {
  if(e.buttons === 1){
    seek(e);
  }
});

sliders.forEach(s => {
  s.addEventListener('change', sliderUpdate);
  s.addEventListener('mousemove', sliderUpdate);
});

skipBtns.forEach(b => {
  b.addEventListener('click', skip);
});

fsBtn.addEventListener('click', toggleFullscreen);