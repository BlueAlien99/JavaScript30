const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

const inputBox = document.querySelector('input.search');
const list = document.querySelector('ul.suggestions');

function commafy(stringNumber){
  return stringNumber.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function updateResults(){

  if(!this.value){
    list.innerHTML = `
      <li>Filter for a city</li>
      <li>or a state</li>`;
    return;
  }

  const regexFilter = new RegExp(this.value, 'gi');
  const filtered = cities.filter(i => i.city.search(regexFilter) >= 0 || i.state.search(regexFilter) >= 0);
  const filteredHtml = filtered.map(i => {
    const cityHl = i.city.replace(regexFilter, '<span class="hl">$&</span>');
    const stateHl = i.state.replace(regexFilter, '<span class="hl">$&</span>');
    const populationCS = commafy(i.population);
    return `
      <li>
        <span class="name">${cityHl}, ${stateHl}</span>
        <span class="population">${populationCS}</span>
      </li>
    `;
  });
  list.innerHTML = filteredHtml.join('');
}

inputBox.addEventListener('input', updateResults);