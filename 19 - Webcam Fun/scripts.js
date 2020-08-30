const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function setupVideo(){
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
        resolve();
      })
      .catch(err => {
        console.error('Oh no! :(', err);
        reject();
      });
  });
}

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(video, 0, 0, width, height);
  const pixels = ctx.getImageData(0, 0, width, height);

  effectRedFilter(pixels);
  effectRGBSplit(pixels);

  ctx.putImageData(pixels, 0, 0);
  requestAnimationFrame(paintToCanvas);
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const thumbnail = document.createElement('a');
  thumbnail.href = data;
  thumbnail.download = 'YoFacade';
  thumbnail.innerHTML = `<img src="${data}" alt="YoFacade">`;
  strip.insertAdjacentElement('afterBegin', thumbnail);
}

function effectRedFilter(pixels){
  for(let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i+1] = pixels.data[i+1] * 0.5;
    pixels.data[i+2] = pixels.data[i+2] * 0.5;
  }
}

function effectRGBSplit(pixels){
  for(let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i-160] = pixels.data[i];
    pixels.data[i+1-320] = pixels.data[i+1];
  }
}


// setupVideo().then(() => requestAnimationFrame(paintToCanvas));

setupVideo();
video.addEventListener('canplay', () => requestAnimationFrame(paintToCanvas));