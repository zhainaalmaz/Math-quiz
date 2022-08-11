if (document.getElementById('leaders')) {
  const select = document.getElementById('leaders__mode-select');
  const options = document.querySelectorAll('.select__item');

  const users = JSON.parse(localStorage.getItem('score')) || [];
  let value = 'practice';
  let user = JSON.parse(localStorage.getItem('username'));

  options.forEach((option) => {
    if (option.value === user.mode) {
      option.selected = true;
    }
    // else {
    //   console.log(option.value, '2');
    //   option.value == 'time-attack';
    // }
  });

  let filteredMode = null;
  function selectMode() {
    value = select.options[select.selectedIndex].value;
    filteredMode = users.filter((mode) => mode.mode === value);
    renderLeaders();
  }

  select.addEventListener('change', selectMode);

  const page = document.querySelector('.leaders__empty');
  const list = document.querySelector('.leaders__items');

  selectMode();

  function renderLeaders() {
    list.innerHTML = '';
    page.innerHTML = '';
    if (filteredMode.length > 0) {
      filteredMode.map((user, i) => {
        let template = `
        <li class="leaders__item">
        <p class="leaders__item-place">${i + 1}</p>
        <p class="leaders__item-name">${user.username}</p>
        <p class="leaders__item-score">${user.score}</p>
        </li>
        `;
        list.insertAdjacentHTML('beforeend', template);
      });
    } else {
      page.insertAdjacentHTML('beforeend', `<p>List is empty :(</p>`);
    }
  }
}
