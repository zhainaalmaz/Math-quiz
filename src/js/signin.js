if (document.getElementById('main')) {
  window.onload = function () {
    document.querySelector('.main__inner').style.opacity = 0;
    setTimeout(() => {
      document.querySelector('.main__inner').style.opacity = 1;
      document.getElementById('loader').style.display = 'none';
    }, 500);
  };

  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const small = document.querySelector('.small');

  const user = JSON.parse(localStorage.getItem('username')) || '';
  if (user.username === undefined) {
    username.value = '';
  } else {
    username.value = user.username;
  }

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
    } else {
      small.innerHTML = 'The username must be required';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    register();
    form.reset();

    username.oninput = (e) => {
      small.innerHTML = '';
      username.value = e.target.value;
    };
  });
}
