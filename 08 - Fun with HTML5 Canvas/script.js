const helpWrapper = document.querySelector('.help-wrapper');

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

const canvas2 = document.querySelector('#cursor');
const ctx2 = canvas2.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let hue = 0;
let thickness = 10;

function draw(e){

  ctx2.clearRect(0, 0, canvas.width, canvas.height);

  ctx2.beginPath();
  ctx2.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx2.arc(e.offsetX, e.offsetY, thickness/2, 0, Math.PI*2);
  ctx2.fill();

  if(!isDrawing){
    return;
  }

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = thickness;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  hue += 1;

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

document.addEventListener('mousedown', e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  if(!helpWrapper.classList.contains('disappear')){
    helpWrapper.classList.add('disappear');
  }
});

document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('mouseleave', () => isDrawing = false);
document.addEventListener('mousemove', draw);

document.addEventListener('keydown', e => {
  if(e.key === 'q'){
    document.body.classList.toggle('dark');
  }
  else if(e.key === 'd'){
    const dl = document.createElement('a');
    dl.download = 'myAwwsomePainting.png';
    dl.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    dl.click();
  }
});

document.addEventListener('wheel', e => {
  thickness = Math.max(1, thickness + e.deltaY/50);
  draw(e);
});

helpWrapper.addEventListener('transitionend', () => {
  helpWrapper.classList.add('removed');
});