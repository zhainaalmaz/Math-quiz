if (document.getElementById('main')) {
  const form = document.getElementById('form');
  const form_btn = document.querySelector('.form__btn');
  const username = document.getElementById('username');

  function register() {
    if (username.value.trim() !== '') {
      const gameMode = document.querySelector('input:checked').value;
      localStorage.setItem(
        'username',
        JSON.stringify({
          username: username.value,
          mode: gameMode,
        })
      );
      window.location.replace('quiz.html');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    register();
    form.reset();
  });

  username.oninput = (e) => {
    username.value = e.target.value;
  };
}
