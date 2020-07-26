const inputs = document.querySelectorAll('.controls input');

function updateVariable(e){
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(i => i.addEventListener('input', updateVariable))