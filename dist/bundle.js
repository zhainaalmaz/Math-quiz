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
      var _highScore2;

      highScore = (_highScore2 = highScore) === null || _highScore2 === void 0 ? void 0 : _highScore2.filter(function (item) {
        return item.username !== m.username && item.mode !== m.mode;
      });
      highScore.push(score);
    } else if (!m) {
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
    document.body.style.overflow = 'hidden';
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

    var startMin = 1.5;
    var time = startMin * 60;
    var total = time;
    id = setInterval(startTimer, 1000);
  } else {
    timer.innerHTML = null;
    progress_bar.style.display = 'none';
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

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			// no module.id needed
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