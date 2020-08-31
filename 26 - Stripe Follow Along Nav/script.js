const triggers = document.querySelectorAll('.cool > li');
const bg = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function enterNavItem(){
  this.classList.add('trigger-enter');
  setTimeout(() => {
    if(this.classList.contains('trigger-enter')){
      this.classList.add('trigger-enter-active');
    }
  }, 150);
  bg.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  bg.style.width = `${coords.width}px`;
  bg.style.height = `${coords.height}px`;
  bg.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

function leaveNavItem(){
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  bg.classList.remove('open');
}

triggers.forEach(t => t.addEventListener('mouseenter', enterNavItem));
triggers.forEach(t => t.addEventListener('mouseleave', leaveNavItem));