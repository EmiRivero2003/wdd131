const input  = document.querySelector('#favchap');
const button = document.querySelector('#addchapter');
const list   = document.querySelector('#list');

button.addEventListener('click', function () {
  const value = input.value.trim();
  if (value !== '') {
    const li        = document.createElement('li');
    const deleteBtn = document.createElement('button');

    li.textContent = value;
    deleteBtn.textContent = '❌';
    deleteBtn.setAttribute('aria-label', `Delete ${value}`);

    li.appendChild(deleteBtn);
    list.appendChild(li);

    deleteBtn.addEventListener('click', function () {
      list.removeChild(li);
      input.focus();
    });

    input.value = '';
    input.focus();
  } else {
    input.focus();
  }
});