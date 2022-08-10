if (document.getElementById('leaders')) {
  const users = JSON.parse(localStorage.getItem('score')) || [];
  const page = document.querySelector('.leaders__empty');
  const list = document.querySelector('.leaders__items');

  if (users.length > 0) {
    users.map((user, i) => {
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
