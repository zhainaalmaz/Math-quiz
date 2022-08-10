// import { startTimer, newTimer } from './timer';

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
  // const close_score = document.querySelector('.score__close');
  const correctAns = document.querySelector('.correct');
  const incorrectAns = document.querySelector('.incorrect');
  const stopBtn = document.querySelector('.quiz__btn');
  const progress_bar = document.getElementById('progress__bar');

  let win = 0;
  let correctQty = 0;
  let incorrectQty = 0;
  let id;

  let user = JSON.parse(localStorage.getItem('username'));
  let highScore = JSON.parse(localStorage.getItem('score')) || [];
  username.textContent = `Have a fun, ${user.username}:)`;

  function savingSores() {
    console.log(highScore);
    const score = {
      score: win,
      correct: correctQty,
      incorrect: incorrectQty,
      ...user,
    };
    highScore.push(score);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(5);
    localStorage.setItem('score', JSON.stringify(highScore));
  }

  if (user.mode === 'time-attack') {
    timer.innerHTML = '00' + ':' + '11';
    startTimer();

    function startTimer() {
      const presentTime = document.getElementById('timer').innerHTML;
      const timeArray = presentTime.split(/[:]+/);
      let m = timeArray[0];
      const s = checkSecond(timeArray[1] - 1);
      if (s == 59) {
        m = m - 1;
      }

      // let pr = (presentTime / 10) * 100;
      // if (presentTime > 0) {
      //   progress_bar.style.width = pr + '%';
      // }

      if (m < 0) {
        setTimeout(id);
        document.body.style.overflow = 'hidden';
        bg_modal.style.opacity = 1;
        bg_modal.style.visibility = 'visible';
        current_score.innerHTML = win;
        correctAns.innerHTML = `Correct : ${correctQty} `;
        incorrectAns.innerHTML = `Incorrect : ${incorrectQty}`;

        // close_score &&
        //   close_score.addEventListener('click', () => {
        //     document.body.style.overflow = 'auto';
        //     bg_modal.style.opacity = 0;
        //   });

        savingSores();
        return;
      }

      timer.innerHTML = m + ':' + s;
      id = setTimeout(startTimer, 1000);
    }

    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {
        sec = '0' + sec;
      }
      if (sec < 0) {
        sec = '59';
      }
      return sec;
    }
  } else {
    timer.innerHTML = null;
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
    win = 0;
    bg_modal.style.opacity = 1;
    bg_modal.style.visibility = 'visible';
    current_score.innerHTML = win;
    correctAns.innerHTML = `Correct : ${correctQty} `;
    incorrectAns.innerHTML = `Incorrect : ${incorrectQty}`;
    clearTimeout(id);
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
          } else {
            win--;
          }
          incorrectQty++;
        } else {
          correct.textContent = 'Wow, score is added!';
          correctQty++;
          win++;
        }
        // win += Number(result.value) === Number(example.result) ? +1 : -1;
        winElement.textContent = win;

        result.value = '';
        example = generateExample();
        renderExample(example);
      }
    });
}
