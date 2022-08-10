// const bg_modal = document.querySelector('.bg-modal');
// const current_score = document.querySelector('.score__current');
// const score__rating = document.querySelector('.score__rating');
// const close_score = document.querySelector('.score__close');
// const timer = document.getElementById('timer');

// let user = JSON.parse(localStorage.getItem('username'));

// if (user.mode === 'time-attack') {
//   timer.innerHTML = '00' + ':' + '11';
//   startTimer();

//   function startTimer() {
//     const presentTime = document.getElementById('timer').innerHTML;
//     const timeArray = presentTime.split(/[:]+/);
//     let m = timeArray[0];
//     const s = checkSecond(timeArray[1] - 1);
//     if (s == 59) {
//       m = m - 1;
//     }

//     if (m < 0) {
//       document.body.style.overflow = 'hidden';
//       bg_modal.style.opacity = 1;
//       bg_modal.style.visibility = 'visible';
//       current_score.innerHTML = `Your score is ${win}`;
//       score__rating.innerHTML = `Your rate is 1 in leaderBoard`;

//       close_score.addEventListener('click', () => {
//         document.body.style.overflow = 'auto';
//         bg_modal.style.opacity = 0;
//       });

//       savingSores();
//       return;
//     }

//     timer.innerHTML = m + ':' + s;
//     setTimeout(startTimer, 1000);
//   }
//   document.querySelector('.progress-bar').style.width =
//     (presentTime * 100) / presentTime + '%';
//   console.log(presentTime);

//   function checkSecond(sec) {
//     if (sec < 10 && sec >= 0) {
//       sec = '0' + sec;
//     }
//     if (sec < 0) {
//       sec = '59';
//     }
//     return sec;
//   }
// } else {
//   timer.innerHTML = null;
//   savingSores();
// }
