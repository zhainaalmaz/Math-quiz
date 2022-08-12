/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/leaders.js":
/*!***************************!*\
  !*** ./src/js/leaders.js ***!
  \***************************/
/***/ (() => {

if (document.getElementById('leaders')) {
  var selectMode = function selectMode() {
    value = select.options[select.selectedIndex].value;
    filteredMode = users.filter(function (mode) {
      return mode.mode === value;
    });
    renderLeaders();
  };

  var renderLeaders = function renderLeaders() {
    list.innerHTML = '';
    page.innerHTML = '';

    if (filteredMode.length > 0) {
      filteredMode.map(function (user, i) {
        var template = "\n        <li class=\"leaders__item\">\n        <p class=\"leaders__item-place\">".concat(i + 1, "</p>\n        <p class=\"leaders__item-name\">").concat(user.username, "</p>\n        <p class=\"leaders__item-score\">").concat(user.score, "</p>\n        </li>\n        ");
        list.insertAdjacentHTML('beforeend', template);
      });
    } else {
      page.insertAdjacentHTML('beforeend', "<p>List is empty :(</p>");
    }
  };

  var select = document.getElementById('leaders__mode-select');
  var options = document.querySelectorAll('.select__item');
  var users = JSON.parse(localStorage.getItem('score')) || [];
  var value = 'practice';
  var user = JSON.parse(localStorage.getItem('username'));
  options.forEach(function (option) {
    if (option.value === user.mode) {
      option.selected = true;
    }
  });
  var filteredMode = null;
  select.addEventListener('change', selectMode);
  var page = document.querySelector('.leaders__empty');
  var list = document.querySelector('.leaders__items');
  selectMode();
}

/***/ }),

/***/ "./src/js/quiz.js":
/*!************************!*\
  !*** ./src/js/quiz.js ***!
  \************************/
/***/ (() => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (document.getElementById('quiz')) {
  var _highScore;

  var savingSores = function savingSores() {
    if (win === 0) return null;

    var score = _objectSpread({
      score: win,
      correct: correctQty,
      incorrect: incorrectQty
    }, user);

    if (m && m.score < win) {
      highScore = highScore.filter(function (item) {
        return item.username !== m.username && item.mode !== m.mode;
      });
      highScore.push(score);
    } else {
      highScore.push(score);
    }

    highScore.sort(function (a, b) {
      return b.score - a.score;
    });
    localStorage.setItem('score', JSON.stringify(highScore));
  };

  var stopGame = function stopGame() {
    clearInterval(id);
    savingSores();
    bg_modal.style.opacity = 1;
    bg_modal.style.visibility = 'visible';
    current_score.innerHTML = win;
    correctAns.innerHTML = "Correct : ".concat(correctQty, " ");
    incorrectAns.innerHTML = "Incorrect : ".concat(incorrectQty);
  };

  var num1 = document.querySelector('.num-1');
  var num2 = document.querySelector('.num-2');
  var operator = document.querySelector('.operator');
  var result = document.querySelector('.result');
  var goBtn = document.querySelector('#go');
  var winElement = document.querySelector('.win');
  var correct = document.querySelector('.quiz__center-answer');
  var timer = document.getElementById('timer');
  var username = document.querySelector('.user');
  var bg_modal = document.querySelector('.bg-modal');
  var current_score = document.querySelector('.score__current');
  var correctAns = document.querySelector('.correct');
  var incorrectAns = document.querySelector('.incorrect');
  var stopBtn = document.querySelector('.quiz__btn');
  var progress_bar = document.querySelector('.progress__bar');
  var plus_one = document.querySelector('.plus-one');
  var minus_one = document.querySelector('.minus-one');
  var quiz_result = document.querySelector('.quiz__result');
  var quiz_inner = document.querySelector('.quiz__inner');
  var win = 0;
  var correctQty = 0;
  var incorrectQty = 0;
  var user = JSON.parse(localStorage.getItem('username'));
  var highScore = JSON.parse(localStorage.getItem('score')) || [];
  var m = (_highScore = highScore) === null || _highScore === void 0 ? void 0 : _highScore.find(function (item) {
    return item.username === user.username && item.mode === user.mode;
  });
  username.textContent = "Have a fun, ".concat(user.username, ":)");
  var id;

  if (user.mode === 'time-attack') {
    var startTimer = function startTimer() {
      var minutes = Math.floor(time / 60);
      var second = time % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      second = second < 10 ? '0' + second : second;
      timer.innerHTML = "".concat(minutes, " : ").concat(second);
      time--;
      progress_bar.style.width = time * 100 / total + '%';

      if (time < 0) {
        var audio = new Audio('../assets/audio/ding-ding-sound-effect.mp3');
        audio.play();
        clearInterval(id);
        document.body.style.overflow = 'hidden';
        bg_modal.style.opacity = 1;
        bg_modal.style.visibility = 'visible';
        current_score.innerHTML = win;
        correctAns.innerHTML = "Correct : ".concat(correctQty, " ");
        incorrectAns.innerHTML = "Incorrect : ".concat(incorrectQty);
        savingSores();
        return;
      }
    };

    var startMin = 1.0;
    var time = startMin * 60;
    var total = time;
    id = setInterval(startTimer, 1000);
  } else {
    timer.innerHTML = null;
    savingSores();
  }

  var getRandom = function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var operators = ['+', '-', '*', '/'];

  var sum = function sum(a, b, operator) {
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator == '/') return a / b;
    return a * b;
  };

  var generateExample = function generateExample() {
    var randomNum1 = getRandom(1, 10);
    var randomNum2 = getRandom(1, 10);
    var operator = operators[getRandom(0, 3)];

    if (operator == '/') {
      for (var i = 0;; i++) {
        if (randomNum1 % randomNum2 == 0) {
          break;
        }

        randomNum1 = getRandom(1, 10);
        randomNum2 = getRandom(1, 10);
      }
    }

    var result = sum(randomNum1, randomNum2, operator);
    return {
      randomNum1: randomNum1,
      randomNum2: randomNum2,
      operator: operator,
      result: result
    };
  };

  var renderExample = function renderExample(data) {
    num1.textContent = data.randomNum1;
    num2.textContent = data.randomNum2;
    operator.textContent = data.operator;
  };

  var example = generateExample();
  renderExample(example);
  stopBtn && stopBtn.addEventListener('click', function () {
    stopGame();
  });
  goBtn && goBtn.addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
      if (!result.value && result.value !== 0) return;

      if (Number(result.value) != Number(example.result)) {
        correct.textContent = 'Opps! Correct answer is ' + Number(example.result) + '.';

        if (win <= 0) {
          win;
          quiz_result.classList.add('win-error');
          minus_one.innerHTML = '-1';
          minus_one.style.display = 'block';
          setTimeout(function () {
            minus_one.style.display = 'none';
            minus_one.innerHTML = '';
            quiz_result.classList.remove('win-error');
          }, 500);
        } else {
          win--;
          quiz_result.classList.add('win-error');
          minus_one.innerHTML = '-1';
          minus_one.style.display = 'block';
          setTimeout(function () {
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
        setTimeout(function () {
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
  quiz_inner.addEventListener('animationend', function () {
    quiz_inner.classList.remove('score-leave');
  });
}

/***/ }),

/***/ "./src/js/signin.js":
/*!**************************!*\
  !*** ./src/js/signin.js ***!
  \**************************/
/***/ (() => {

if (document.getElementById('main')) {
  var register = function register() {
    if (username.value.trim() !== '') {
      var gameMode = document.querySelector('input:checked').value;
      localStorage.setItem('username', JSON.stringify({
        username: username.value,
        mode: gameMode
      }));
      window.location.replace('quiz.html');
    } else {
      small.innerHTML = 'The username must be required';
    }
  };

  window.onload = function () {
    document.querySelector('.main__inner').style.opacity = 0;
    setTimeout(function () {
      document.querySelector('.main__inner').style.opacity = 1;
      document.getElementById('loader').style.display = 'none';
    }, 500);
  };

  var form = document.getElementById('form');
  var username = document.getElementById('username');
  var small = document.querySelector('.small');
  var user = JSON.parse(localStorage.getItem('username')) || '';

  if (user.username === undefined) {
    username.value = '';
  } else {
    username.value = user.username;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    register();
    form.reset();

    username.oninput = function (e) {
      small.innerHTML = '';
      username.value = e.target.value;
    };
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;600;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::after,\n*::before {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: \"Montserrat\", sans-serif;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0;\n}\n\np {\n  margin: 0;\n  padding: 0;\n}\n\nul,\nol {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nimg {\n  max-width: 100%;\n}\n\nbutton {\n  padding: 0;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n}\n\ninput {\n  border: none;\n  outline: none;\n}\n\n.container {\n  max-width: 1010px;\n  width: 100%;\n  padding: 0 15px;\n  margin: 0 auto;\n}\n\n.btn {\n  font-style: normal;\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 20px;\n  text-align: center;\n  text-transform: uppercase;\n  color: #ffffff;\n  border-radius: 8px;\n  transition-duration: 0.3s;\n  border: 2px solid transparent;\n}\n\n.loader {\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  border-radius: 50%;\n  background: linear-gradient(45deg, transparent 40%, skyblue);\n  animation: move 0.8s linear infinite;\n  top: 40%;\n  left: 43%;\n}\n\n.loader::before {\n  position: absolute;\n  content: \"\";\n  top: 6px;\n  left: 6px;\n  right: 6px;\n  bottom: 6px;\n  background: rgb(241, 239, 239);\n  border-radius: 50%;\n  z-index: 2;\n}\n\n.loader::after {\n  position: absolute;\n  content: \"\";\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: linear-gradient(45deg, transparent 40%, skyblue);\n  filter: blur(20px);\n}\n\n@keyframes move {\n  to {\n    transform: rotate(360deg);\n    filter: hue-rotate(360deg);\n  }\n}\n.main {\n  width: 100%;\n  background-color: #191a1b;\n  color: white;\n  min-height: 100vh;\n}\n.main__inner h1 {\n  text-align: center;\n  font-weight: 600;\n  font-size: 48px;\n  line-height: 20px;\n  color: #01a7e1;\n  padding: 80px 0;\n}\n.main__inner .form {\n  padding: 20px;\n  margin: 0 auto;\n}\n.main__inner .form__control {\n  padding: 40px 56px;\n  max-width: 643px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 50px;\n  margin: 0 auto;\n}\n.main__inner .form__control input {\n  width: 100%;\n  background: #fff;\n  border-radius: 8px;\n  max-width: 530px;\n  height: 50px;\n  font-weight: 400;\n  font-size: 18px;\n  line-height: 22px;\n  color: #000000;\n  padding: 0 21px;\n}\n.main__inner .form__control-register {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.main__inner .form__mode {\n  width: 100%;\n  text-align: center;\n}\n.main__inner .form__mode-items {\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  padding: 25px 0 0 0;\n}\n.main__inner .form__mode-items .form__mode-radio label {\n  color: #01a7e1;\n  border-radius: 5px;\n  padding: 10px 20px;\n  border: 2px solid #01a7e1;\n  cursor: pointer;\n}\n.main__inner .form__mode-items .form__mode-radio input[type=radio] {\n  position: absolute;\n  display: none;\n  width: 100%;\n  appearance: none;\n}\n.main__inner .form__mode-items .form__mode-radio input[type=radio]:checked + label {\n  background: #01a7e1;\n  color: #fff;\n}\n.main__inner .form__mode h2 {\n  font-style: normal;\n  font-weight: 700;\n  font-size: 30px;\n  line-height: 37px;\n  color: #fff;\n}\n.main__inner .form button {\n  padding: 10px 45px;\n  margin-top: 10px;\n  max-width: 530px;\n  height: 48px;\n  background: #01a7e1;\n}\n.main__inner .form__rules a {\n  color: #01a7e1;\n}\n.main__inner .form__leaderboards a {\n  color: #01a7e1;\n  font-weight: 700;\n}\n\n.small {\n  color: red;\n  padding: 10px;\n}\n\n@media (max-width: 556px) {\n  .main__inner h1 {\n    padding: 40px 0;\n  }\n  .main__inner .form__control {\n    padding: 20px 0;\n    gap: 36px;\n  }\n  .main__inner .form {\n    padding: 0;\n  }\n  .loader {\n    display: none;\n  }\n  .main__inner .form__mode h2 {\n    font-size: 25px;\n  }\n}\n.quiz {\n  color: #fff;\n  padding: 30px 0;\n  background-color: #191a1b;\n  min-height: 100vh;\n}\n.quiz__main {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.quiz__main h1 {\n  text-align: center;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 48px;\n  line-height: 20px;\n}\n.quiz__info {\n  display: flex;\n  justify-content: space-between;\n  padding: 30px 0;\n}\n.quiz__info-aside {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  align-self: flex-end;\n  text-align: center;\n}\n.quiz__btn {\n  background-color: #01a7e1;\n  padding: 10px 35px;\n}\n.quiz__inner {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n  padding: 30px;\n  gap: 50px;\n  font-size: 70px;\n  font-weight: 500;\n  line-height: 90px;\n  animation: new-score 0.5s;\n}\n.quiz__inner input {\n  text-align: center;\n  border: 2px solid #000;\n  border-radius: 8px;\n  padding: 15px;\n  font-size: 70px;\n  font-weight: 600;\n  line-height: 90px;\n  max-width: 170px;\n}\n.quiz__inner input::-webkit-outer-spin-button, .quiz__inner input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.quiz__result {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  align-items: center;\n}\n\n.win {\n  font-size: 70px;\n  font-weight: 700;\n  text-align: center;\n  position: relative;\n  display: inline-block;\n}\n\nh3 {\n  margin-top: 30px;\n  font-size: 26px;\n}\n\n.quiz__center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 50px 30px;\n}\n\n.timer,\n.user {\n  color: #01a7e1;\n  font-size: 20px;\n}\n\n.progress {\n  width: 100%;\n  margin: 20px auto;\n  border-radius: 10px;\n  background-color: #fff;\n  border: 1px solid #01a7e1;\n  transition-duration: 0.2s;\n}\n.progress__bar {\n  height: 20px;\n  background-color: #01a7e1;\n  border-radius: 10px;\n  transition: all 2s;\n}\n\n.plus-one {\n  color: #118c11;\n  position: absolute;\n  left: 48%;\n  animation-name: fade-in-up;\n  animation-duration: 3s;\n  animation-iteration-count: 1;\n  animation-timing-function: ease;\n  display: none;\n  font-size: 50px;\n}\n\n.minus-one {\n  color: #d13e15;\n  position: absolute;\n  left: 48%;\n  animation-name: fade-in-up;\n  animation-duration: 3s;\n  animation-iteration-count: 1;\n  animation-timing-function: ease;\n  display: none;\n  font-size: 50px;\n}\n\n@keyframes fade-in-up {\n  from {\n    top: 70%;\n    opacity: 1;\n  }\n  to {\n    top: 20%;\n    opacity: 0.5;\n  }\n}\n.score-leave {\n  animation: leave-score 0.5s;\n}\n\n@keyframes new-score {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0%);\n  }\n}\n@keyframes leave-score {\n  from {\n    transform: translateX(0%);\n  }\n  to {\n    transform: translateX(-100%);\n  }\n}\n.win-error {\n  animation: shake 0.5s;\n  animation-iteration-count: infinite;\n}\n\n@keyframes shake {\n  0% {\n    transform: translate(1px, 1px) rotate(0deg);\n  }\n  10% {\n    transform: translate(-1px, -2px) rotate(-1deg);\n  }\n  20% {\n    transform: translate(-3px, 0px) rotate(1deg);\n  }\n  30% {\n    transform: translate(3px, 2px) rotate(0deg);\n  }\n  40% {\n    transform: translate(1px, -1px) rotate(1deg);\n  }\n  50% {\n    transform: translate(-1px, 2px) rotate(-1deg);\n  }\n  60% {\n    transform: translate(-3px, 1px) rotate(0deg);\n  }\n  70% {\n    transform: translate(3px, 1px) rotate(-1deg);\n  }\n  80% {\n    transform: translate(-1px, -1px) rotate(1deg);\n  }\n  90% {\n    transform: translate(1px, 2px) rotate(0deg);\n  }\n  100% {\n    transform: translate(1px, -2px) rotate(-1deg);\n  }\n}\n@media (max-width: 992px) {\n  .quiz {\n    padding: 0;\n  }\n  .quiz__center {\n    padding: 0 30px;\n  }\n  .quiz__inner {\n    gap: 20px;\n    font-size: 50px;\n  }\n  .quiz__inner input {\n    max-width: 90px;\n    padding: 6px;\n    font-size: 50px;\n  }\n  .quiz__btn {\n    padding: 10px 25px;\n  }\n  .quiz__main h1 {\n    font-size: 38px;\n  }\n  .win {\n    font-size: 50px;\n  }\n}\n@media (max-width: 556px) {\n  .timer,\n.user {\n    color: #01a7e1;\n    font-size: 16px;\n  }\n  .quiz__center-answer {\n    font-size: 16px;\n  }\n  .quiz__result {\n    gap: 10px;\n  }\n  .quiz__info {\n    padding: 30px 0 60px;\n  }\n}\n.bg-modal {\n  background-color: rgba(0, 0, 0, 0.35);\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: start;\n  opacity: 0;\n  visibility: hidden;\n  z-index: 20;\n  overflow-y: auto;\n}\n\n.score__form {\n  margin: 20px;\n  position: relative;\n  max-width: 496px;\n  height: 700px;\n  background-color: #ffffff;\n  opacity: 1;\n  padding: 30px 60px;\n  border-radius: 4px;\n}\n.score__form-score {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n.score__form-score p {\n  font-weight: 400;\n  font-size: 30px;\n  line-height: 61px;\n}\n.score__form-score .score__current {\n  font-weight: 400;\n  font-size: 50px;\n  line-height: 134px;\n}\n.score__form-info h1 {\n  font-weight: 400;\n  font-size: 46px;\n  line-height: 85px;\n}\n.score__form-rating p {\n  font-weight: 400;\n  font-size: 24px;\n  line-height: 37px;\n}\n.score__form-btns {\n  padding: 50px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  align-items: center;\n}\n.score__form-btns a {\n  padding: 10px 25px;\n}\n.score__form-btns .score-btn {\n  background-color: #01a7e1;\n  padding: 10px 25px;\n}\n\n@media (max-width: 556px) {\n  .score__form-info h1 {\n    font-size: 36px;\n    line-height: 45px;\n  }\n}\n.leaders {\n  background-color: #191a1b;\n  height: 100vh;\n  padding-top: 40px;\n}\n.leaders__empty {\n  margin: 0 auto;\n  text-align: center;\n  padding: 50px 0;\n  font-weight: 400;\n  font-size: 30px;\n  line-height: 37px;\n}\n.leaders__inner {\n  padding: 40px;\n  max-width: 50%;\n  margin: 0 auto;\n  background: #ffffff;\n  box-shadow: 0px 4px 40px 1px rgba(0, 0, 0, 0.1);\n  border-radius: 20px;\n}\n.leaders__inner span {\n  padding: 50px 0;\n  font-weight: 400;\n  font-size: 30px;\n  line-height: 37px;\n}\n.leaders__inner h1 {\n  font-weight: 400;\n  font-size: 46px;\n  line-height: 85px;\n}\n.leaders__inner select {\n  max-width: 293px;\n  border: 3px solid #000000;\n}\n.leaders__mode {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 13px;\n}\n.leaders__back {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-weight: 400;\n  font-size: 30px;\n  line-height: 37px;\n  padding-bottom: 20px;\n}\n.leaders__back img {\n  width: 40px;\n}\n.leaders__item {\n  display: flex;\n  gap: 20px;\n  font-weight: 400;\n  font-size: 30px;\n  line-height: 49px;\n}\n.leaders__item-score {\n  font-weight: 600;\n}\n\n@media (max-width: 992px) {\n  .leaders {\n    padding: 20px;\n  }\n  .leaders__inner {\n    max-width: 70%;\n  }\n  .leaders__inner h1 {\n    font-size: 36px;\n    line-height: 35px;\n  }\n}\n@media (max-width: 556px) {\n  .leaders__inner {\n    max-width: 95%;\n  }\n  .leaders__inner h1,\n.leaders__inner span {\n    font-size: 26px;\n    line-height: 35px;\n  }\n  .leaders__back {\n    font-size: 16px;\n    line-height: 45px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles/commom.scss","webpack://./src/styles/styles.scss","webpack://./src/styles/main.scss","webpack://./src/styles/quiz.scss","webpack://./src/styles/score-modal.scss","webpack://./src/styles/leaders.scss"],"names":[],"mappings":"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","sourcesContent":["*,\n*::after,\n*::before {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: 'Montserrat', sans-serif;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0;\n}\n\np {\n  margin: 0;\n  padding: 0;\n}\n\nul,\nol {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nimg {\n  max-width: 100%;\n}\n\nbutton {\n  padding: 0;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n}\n\ninput {\n  border: none;\n  outline: none;\n}\n\n.container {\n  max-width: 990px + 20px;\n  width: 100%;\n  padding: 0 15px;\n  margin: 0 auto;\n}\n\n.btn {\n  font-style: normal;\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 20px;\n  text-align: center;\n  text-transform: uppercase;\n  color: #ffffff;\n  border-radius: 8px;\n  transition-duration: 0.3s;\n  border: 2px solid transparent;\n}\n","@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;600;700&display=swap');\n@import './commom.scss';\n@import './main.scss';\n@import './quiz.scss';\n@import './score-modal.scss';\n@import './leaders.scss';\n",".loader {\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  border-radius: 50%;\n  background: linear-gradient(45deg, transparent 40%, skyblue);\n  animation: move 0.8s linear infinite;\n  top: 40%;\n  left: 43%;\n}\n\n.loader::before {\n  position: absolute;\n  content: '';\n  top: 6px;\n  left: 6px;\n  right: 6px;\n  bottom: 6px;\n  background: rgb(241, 239, 239);\n  border-radius: 50%;\n  z-index: 2;\n}\n\n.loader::after {\n  position: absolute;\n  content: '';\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: linear-gradient(45deg, transparent 40%, skyblue);\n  filter: blur(20px);\n}\n@keyframes move {\n  to {\n    transform: rotate(360deg);\n    filter: hue-rotate(360deg);\n  }\n}\n\n.main {\n  width: 100%;\n  background-color: #191a1b;\n  color: white;\n  min-height: 100vh;\n  &__inner {\n    h1 {\n      text-align: center;\n      font-weight: 600;\n      font-size: 48px;\n      line-height: 20px;\n      color: #01a7e1;\n      padding: 80px 0;\n    }\n    .form {\n      padding: 20px;\n      margin: 0 auto;\n\n      &__control {\n        padding: 40px 56px;\n        max-width: 643px;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 50px;\n        margin: 0 auto;\n\n        & input {\n          width: 100%;\n          background: #fff;\n          border-radius: 8px;\n          max-width: 530px;\n          height: 50px;\n          font-weight: 400;\n          font-size: 18px;\n          line-height: 22px;\n          color: #000000;\n          padding: 0 21px;\n        }\n\n        &-register {\n          width: 100%;\n          display: flex;\n          flex-direction: column;\n          gap: 1px;\n        }\n      }\n      &__mode {\n        width: 100%;\n        text-align: center;\n        &-items {\n          display: flex;\n          justify-content: space-between;\n          position: relative;\n          padding: 25px 0 0 0;\n\n          .form__mode-radio {\n            & label {\n              color: #01a7e1;\n              border-radius: 5px;\n              padding: 10px 20px;\n              border: 2px solid #01a7e1;\n              cursor: pointer;\n            }\n            input[type='radio'] {\n              position: absolute;\n              display: none;\n              width: 100%;\n              appearance: none;\n            }\n            input[type='radio']:checked + label {\n              background: #01a7e1;\n              color: #fff;\n            }\n          }\n        }\n\n        h2 {\n          font-style: normal;\n          font-weight: 700;\n          font-size: 30px;\n          line-height: 37px;\n          color: #fff;\n        }\n      }\n      button {\n        padding: 10px 45px;\n        margin-top: 10px;\n        max-width: 530px;\n        height: 48px;\n        background: #01a7e1;\n      }\n\n      &__rules a {\n        color: #01a7e1;\n      }\n\n      &__leaderboards a {\n        color: #01a7e1;\n        font-weight: 700;\n      }\n    }\n  }\n}\n\n.small {\n  color: red;\n  padding: 10px;\n}\n\n@media (max-width: 556px) {\n  .main__inner h1 {\n    padding: 40px 0;\n  }\n  .main__inner .form__control {\n    padding: 20px 0;\n    gap: 36px;\n  }\n  .main__inner .form {\n    padding: 0;\n  }\n\n  .loader {\n    display: none;\n  }\n\n  .main__inner .form__mode h2 {\n    font-size: 25px;\n  }\n}\n",".quiz {\n  color: #fff;\n  padding: 30px 0;\n  background-color: #191a1b;\n  min-height: 100vh;\n\n  &__main {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    & h1 {\n      text-align: center;\n      font-style: normal;\n      font-weight: 600;\n      font-size: 48px;\n      line-height: 20px;\n    }\n  }\n\n  &__info {\n    display: flex;\n    justify-content: space-between;\n    padding: 30px 0;\n\n    &-aside {\n      display: flex;\n      flex-direction: column;\n      gap: 15px;\n      align-self: flex-end;\n      text-align: center;\n    }\n  }\n\n  &__btn {\n    background-color: #01a7e1;\n    padding: 10px 35px;\n  }\n\n  &__inner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    overflow: hidden;\n    padding: 30px;\n    gap: 50px;\n    font-size: 70px;\n    font-weight: 500;\n    line-height: 90px;\n    animation: new-score 0.5s;\n\n    input {\n      text-align: center;\n      border: 2px solid #000;\n      border-radius: 8px;\n      padding: 15px;\n      font-size: 70px;\n      font-weight: 600;\n      line-height: 90px;\n      max-width: 170px;\n\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n    }\n  }\n  &__result {\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n    align-items: center;\n  }\n}\n\n.win {\n  font-size: 70px;\n  font-weight: 700;\n  text-align: center;\n  position: relative;\n  display: inline-block;\n}\n\nh3 {\n  margin-top: 30px;\n  font-size: 26px;\n}\n.quiz__center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 50px 30px;\n}\n\n.timer,\n.user {\n  color: #01a7e1;\n  font-size: 20px;\n}\n\n.progress {\n  width: 100%;\n  margin: 20px auto;\n  border-radius: 10px;\n  background-color: #fff;\n  border: 1px solid #01a7e1;\n  transition-duration: 0.2s;\n\n  &__bar {\n    height: 20px;\n    background-color: #01a7e1;\n    border-radius: 10px;\n    transition: all 2s;\n  }\n}\n\n.plus-one {\n  color: #118c11;\n  position: absolute;\n  left: 48%;\n  animation-name: fade-in-up;\n  animation-duration: 3s;\n  animation-iteration-count: 1;\n  animation-timing-function: ease;\n  display: none;\n  font-size: 50px;\n}\n\n.minus-one {\n  color: #d13e15;\n  position: absolute;\n  left: 48%;\n  animation-name: fade-in-up;\n  animation-duration: 3s;\n  animation-iteration-count: 1;\n  animation-timing-function: ease;\n  display: none;\n  font-size: 50px;\n}\n\n@keyframes fade-in-up {\n  from {\n    top: 70%;\n    opacity: 1;\n  }\n\n  to {\n    top: 20%;\n    opacity: 0.5;\n  }\n}\n\n.score-leave {\n  animation: leave-score 0.5s;\n}\n\n@keyframes new-score {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0%);\n  }\n}\n@keyframes leave-score {\n  from {\n    transform: translateX(0%);\n  }\n  to {\n    transform: translateX(-100%);\n  }\n}\n\n.win-error {\n  animation: shake 0.5s;\n  animation-iteration-count: infinite;\n}\n\n@keyframes shake {\n  0% {\n    transform: translate(1px, 1px) rotate(0deg);\n  }\n  10% {\n    transform: translate(-1px, -2px) rotate(-1deg);\n  }\n  20% {\n    transform: translate(-3px, 0px) rotate(1deg);\n  }\n  30% {\n    transform: translate(3px, 2px) rotate(0deg);\n  }\n  40% {\n    transform: translate(1px, -1px) rotate(1deg);\n  }\n  50% {\n    transform: translate(-1px, 2px) rotate(-1deg);\n  }\n  60% {\n    transform: translate(-3px, 1px) rotate(0deg);\n  }\n  70% {\n    transform: translate(3px, 1px) rotate(-1deg);\n  }\n  80% {\n    transform: translate(-1px, -1px) rotate(1deg);\n  }\n  90% {\n    transform: translate(1px, 2px) rotate(0deg);\n  }\n  100% {\n    transform: translate(1px, -2px) rotate(-1deg);\n  }\n}\n\n@media (max-width: 992px) {\n  .quiz {\n    padding: 0;\n\n    &__center {\n      padding: 0 30px;\n    }\n    &__inner {\n      gap: 20px;\n      font-size: 50px;\n\n      input {\n        max-width: 90px;\n        padding: 6px;\n        font-size: 50px;\n      }\n    }\n\n    &__btn {\n      padding: 10px 25px;\n    }\n\n    &__main {\n      h1 {\n        font-size: 38px;\n      }\n    }\n  }\n  .win {\n    font-size: 50px;\n  }\n}\n\n@media (max-width: 556px) {\n  .timer,\n  .user {\n    color: #01a7e1;\n    font-size: 16px;\n  }\n\n  .quiz__center-answer {\n    font-size: 16px;\n  }\n\n  .quiz__result {\n    gap: 10px;\n  }\n\n  .quiz__info {\n    padding: 30px 0 60px;\n  }\n}\n",".bg-modal {\n  background-color: rgba(0, 0, 0, 0.35);\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: start;\n  opacity: 0;\n  visibility: hidden;\n  z-index: 20;\n  overflow-y: auto;\n}\n\n.score__form {\n  margin: 20px;\n  position: relative;\n  max-width: 466px + 30px;\n  height: 700px;\n  background-color: #ffffff;\n  opacity: 1;\n  padding: 30px 60px;\n  border-radius: 4px;\n\n  &-score {\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    p {\n      font-weight: 400;\n      font-size: 30px;\n      line-height: 61px;\n    }\n    .score__current {\n      font-weight: 400;\n      font-size: 50px;\n      line-height: 134px;\n    }\n  }\n\n  &-info {\n    h1 {\n      font-weight: 400;\n      font-size: 46px;\n      line-height: 85px;\n    }\n  }\n\n  &-rating {\n    p {\n      font-weight: 400;\n      font-size: 24px;\n      line-height: 37px;\n    }\n  }\n  &-btns {\n    padding: 50px 0;\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n    align-items: center;\n    a {\n      padding: 10px 25px;\n    }\n    .score-btn {\n      background-color: #01a7e1;\n      padding: 10px 25px;\n    }\n  }\n}\n\n@media (max-width: 556px) {\n  .score__form-info {\n    h1 {\n      font-size: 36px;\n      line-height: 45px;\n    }\n  }\n}\n",".leaders {\n  background-color: #191a1b;\n  height: 100vh;\n  padding-top: 40px;\n\n  &__empty {\n    margin: 0 auto;\n    text-align: center;\n    padding: 50px 0;\n    font-weight: 400;\n    font-size: 30px;\n    line-height: 37px;\n  }\n\n  &__inner {\n    padding: 40px;\n    max-width: 50%;\n    margin: 0 auto;\n    background: #ffffff;\n    box-shadow: 0px 4px 40px 1px rgba(0, 0, 0, 0.1);\n    border-radius: 20px;\n\n    span {\n      padding: 50px 0;\n      font-weight: 400;\n      font-size: 30px;\n      line-height: 37px;\n    }\n\n    h1 {\n      font-weight: 400;\n      font-size: 46px;\n      line-height: 85px;\n    }\n\n    select {\n      max-width: 293px;\n      border: 3px solid #000000;\n    }\n  }\n\n  &__mode {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 13px;\n  }\n\n  &__back {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    font-weight: 400;\n    font-size: 30px;\n    line-height: 37px;\n    padding-bottom: 20px;\n\n    img {\n      width: 40px;\n    }\n  }\n\n  &__item {\n    display: flex;\n    gap: 20px;\n    font-weight: 400;\n    font-size: 30px;\n    line-height: 49px;\n\n    &-score {\n      font-weight: 600;\n    }\n  }\n}\n\n@media (max-width: 992px) {\n  .leaders {\n    padding: 20px;\n    &__inner {\n      max-width: 70%;\n      h1 {\n        font-size: 36px;\n        line-height: 35px;\n      }\n    }\n  }\n}\n\n@media (max-width: 556px) {\n  .leaders {\n    &__inner {\n      max-width: 95%;\n      h1,\n      span {\n        font-size: 26px;\n        line-height: 35px;\n      }\n    }\n    &__back {\n      font-size: 16px;\n      line-height: 45px;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/styles/styles.scss */ "./src/styles/styles.scss");
/* harmony import */ var _src_js_quiz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/js/quiz */ "./src/js/quiz.js");
/* harmony import */ var _src_js_quiz__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_js_quiz__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_js_signin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/js/signin */ "./src/js/signin.js");
/* harmony import */ var _src_js_signin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_js_signin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_js_leaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/js/leaders */ "./src/js/leaders.js");
/* harmony import */ var _src_js_leaders__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_js_leaders__WEBPACK_IMPORTED_MODULE_3__);




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map