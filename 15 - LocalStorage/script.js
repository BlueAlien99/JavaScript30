const addItemsForm = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(sessionStorage.getItem('js30#15-items')) || [];

function addItems(e){
  e.preventDefault();
  const input = this.querySelector('input[type="text"]');
  const newItem = {
    name: input.value,
    checked: false
  };
  this.reset();
  items.push(newItem);
  sessionStorage.setItem('js30#15-items', JSON.stringify(items));
  generateList(items, itemsList);
}

function generateList(items, itemsList){
  itemsList.innerHTML = items.map((item, i) => {
    const checked = item.checked ? 'checked' : '';
    return `
      <li>
        <input type="checkbox" id="item-${i}" data-index="${i}" ${checked}>
        <label for="item-${i}">${item.name}</label>
      </li>
    `;
  }).join('');
}

function checkItem(e){
  const li = e.target;
  const index = li.dataset.index;
  items[index].checked = !items[index].checked;
  sessionStorage.setItem('js30#15-items', JSON.stringify(items));
}

addItemsForm.addEventListener('submit', addItems);
itemsList.addEventListener('change', checkItem);

generateList(items, itemsList);