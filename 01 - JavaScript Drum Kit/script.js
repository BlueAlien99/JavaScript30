const docFrag = document.createDocumentFragment();
const keysParent = document.createElement('div');
keysParent.classList.add('keys');
docFrag.appendChild(keysParent);

keys_data.forEach(k => {
  const div = document.createElement('div');
  div.setAttribute('data-key', k["data-key"]);
  div.classList.add('key');
  div.innerHTML = `<kbd>${k.kbd}</kbd><span class="sound">${k.sound}</span>`;
  keysParent.appendChild(div);

  const audio = document.createElement('audio');
  audio.setAttribute('data-key', k["data-key"]);
  audio.src = `sounds/${k.sound}.wav`;
  docFrag.appendChild(audio);
})

document.body.appendChild(docFrag);

function playSound(e){
  if(e.type === 'mousedown'){
    e.keyCode = e.currentTarget.getAttribute('data-key');
  }

  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  
  if(key === null){
    return;
  }
  
  key.classList.add("playing");
  
  sound.currentTime = 0;
  sound.play();
}

function stopPlaying(e){
  if(e.propertyName === 'transform'){
    e.target.classList.remove('playing');
  }
}

function stopPlayingAlt(e){
  const key = document.querySelector(`.key[data-key="${e.target.getAttribute('data-key')}"]`);
  key.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(k => {
  k.addEventListener('transitionend', stopPlaying);
  k.addEventListener('mousedown', playSound);
});

const audios = document.querySelectorAll('audio');
audios.forEach(a => a.addEventListener('ended', stopPlayingAlt));

window.addEventListener('keydown', playSound);