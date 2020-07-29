const mainPanel = document.querySelector('.panels');
const panels = document.querySelectorAll('.panel');

function toggleOpen(e){

  let targetPanel;

  if(e.target.parentElement.classList.contains('panel')){
    targetPanel = e.target.parentElement;
  } else{
    targetPanel = e.target;
  }

  if(!targetPanel.classList.contains('open')){
    panels.forEach(p => p.classList.remove('open'));
  }

  targetPanel.classList.toggle('open');
}

function toggleActive(e){
  if(e.propertyName.includes('flex')){
    if(this.classList.contains('open')){
      this.classList.add('active');
    } else{
      this.classList.remove('active');
    }
  }
}

document.addEventListener('click', toggleOpen);

panels.forEach(p => p.addEventListener('transitionend', toggleActive));
