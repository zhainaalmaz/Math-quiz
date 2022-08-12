if (document.getElementById('quiz')) {
  const num1 = document.querySelector('.num-1');
  const num2 = document.querySelector('.num-2');
  const operator = document.querySelector('.operator');
  const result = document.querySelector('.result');
  const goBtn = document.querySelector('#go');
  const winElement = document.querySelector('.win');
  const correct = document.querySelector('.quiz__center-answer');
  const timer = document.getElementById('timer');
  const username = document.querySelector('.user');
  const bg_modal = document.querySelector('.bg-modal');
  const current_score = document.querySelector('.score__current');
  const correctAns = document.querySelector('.correct');
  const incorrectAns = document.querySelector('.incorrect');
  const stopBtn = document.querySelector('.quiz__btn');
  const progress_bar = document.querySelector('.progress__bar');
  const plus_one = document.querySelector('.plus-one');
  const minus_one = document.querySelector('.minus-one');
  const quiz_result = document.querySelector('.quiz__result');
  const quiz_inner = document.querySelector('.quiz__inner');

  let win = 0;
  let correctQty = 0;
  let incorrectQty = 0;

  let user = JSON.parse(localStorage.getItem('username'));
  let highScore = JSON.parse(localStorage.getItem('score')) || [];
  let m = highScore?.find(
    (item) => item.username === user.username && item.mode === user.mode
  );

  username.textContent = `Have a fun, ${user.username}:)`;

  function savingSores() {
    if (win === 0) return null;

    const score = {
      score: win,
      correct: correctQty,
      incorrect: incorrectQty,
      ...user,
    };

    if (m && m.score < win) {
      highScore = highScore?.filter(
        (item) => item.username !== m.username && item.mode !== m.mode
      );
      highScore.push(score);
    } else if (!m) {
      highScore.push(score);
    }
    highScore.sort((a, b) => b.score - a.score);
    localStorage.setItem('score', JSON.stringify(highScore));
  }

  let id;

  if (user.mode === 'time-attack') {
    let startMin = 1.0;
    let time = startMin * 60;
    let total = time;
    id = setInterval(startTimer, 1000);

    function startTimer() {
      let minutes = Math.floor(time / 60);
      let second = time % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      second = second < 10 ? '0' + second : second;
      timer.innerHTML = `${minutes} : ${second}`;
      time--;

      progress_bar.style.width = (time * 100) / total + '%';

      if (time < 0) {
        var audio = new Audio('../assets/audio/ding-ding-sound-effect.mp3');
        audio.play();
        clearInterval(id);
        document.body.style.overflow = 'hidden';
        bg_modal.style.opacity = 1;
        bg_modal.style.visibility = 'visible';
        current_score.innerHTML = win;
        correctAns.innerHTML = `Correct : ${correctQty} `;
        incorrectAns.innerHTML = `Incorrect : ${incorrectQty}`;
        savingSores();
        return;
      }
    }
  } else {
    timer.innerHTML = null;
    progress_bar.style.display = 'none';
    savingSores();
  }

  const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const operators = ['+', '-', '*', '/'];

  const sum = (a, b, operator) => {
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator == '/') return a / b;
    return a * b;
  };

  const generateExample = () => {
    let randomNum1 = getRandom(1, 10);
    let randomNum2 = getRandom(1, 10);
    const operator = operators[getRandom(0, 3)];

    if (operator == '/') {
      for (let i = 0; ; i++) {
        if (randomNum1 % randomNum2 == 0) {
          break;
        }
        randomNum1 = getRandom(1, 10);
        randomNum2 = getRandom(1, 10);
      }
    }
    const result = sum(randomNum1, randomNum2, operator);
    return { randomNum1, randomNum2, operator, result };
  };

  const renderExample = (data) => {
    num1.textContent = data.randomNum1;
    num2.textContent = data.randomNum2;
    operator.textContent = data.operator;
  };

  let example = generateExample();
  renderExample(example);

  function stopGame() {
    clearInterval(id);
    savingSores();
    bg_modal.style.opacity = 1;
    bg_modal.style.visibility = 'visible';
    current_score.innerHTML = win;
    correctAns.innerHTML = `Correct : ${correctQty} `;
    incorrectAns.innerHTML = `Incorrect : ${incorrectQty}`;
  }

  stopBtn &&
    stopBtn.addEventListener('click', () => {
      stopGame();
    });

  goBtn &&
    goBtn.addEventListener('keypress', (event) => {
      if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
        if (!result.value && result.value !== 0) return;

        if (Number(result.value) != Number(example.result)) {
          correct.textContent =
            'Opps! Correct answer is ' + Number(example.result) + '.';
          if (win <= 0) {
            win;
            quiz_result.classList.add('win-error');
            minus_one.innerHTML = '-1';
            minus_one.style.display = 'block';
            setTimeout(() => {
              minus_one.style.display = 'none';
              minus_one.innerHTML = '';
              quiz_result.classList.remove('win-error');
            }, 500);
          } else {
            win--;
            quiz_result.classList.add('win-error');
            minus_one.innerHTML = '-1';
            minus_one.style.display = 'block';
            setTimeout(() => {
              minus_one.style.display = 'none';
              minus_one.innerHTML = '';
              quiz_result.classList.remove('win-error');
            }, 500);
          }
          incorrectQty++;
        } else {
          correct.textContent = 'Wow, score is added!';
          correctQty++;
          win++;
          plus_one.innerHTML = '+1';
          plus_one.style.display = 'block';
          setTimeout(() => {
            plus_one.style.display = 'none';
            plus_one.innerHTML = '';
          }, 1000);
        }
        winElement.textContent = win;
        quiz_inner.classList.add('score-leave');
        result.value = '';
        example = generateExample();
        renderExample(example);
      }
    });

  quiz_inner.addEventListener('animationend', () => {
    quiz_inner.classList.remove('score-leave');
  });
}
