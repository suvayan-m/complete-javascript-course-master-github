'use strict';

let number = Math.trunc(Math.random() * 20 + 1);

console.log(number, 'Page Reloaded');

let score = 20;

let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const updateScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const disableInput = function () {
  document.querySelector('.guess').disabled = true;
};

const enableInput = function () {
  document.querySelector('.guess').disabled = false;
};

// const reset = function () {
//   displayMessage(`🤔 Start guessing...`);
//   updateScore(20);
//   document.querySelector('body').style.backgroundColor = `#222`;
//   document.querySelector('.number').textContent = `?`;
//   document.querySelector('.number').style.width = `15rem`;
//   document.querySelector('.guess').value = ``;
//   score = 20;
//   number = Math.trunc(Math.random() * 20 + 1);
//   console.log(number, 'Again pressed');
// };

document.querySelector('.again').addEventListener('click', function () {
  displayMessage(`🤔 Start guessing...`);
  updateScore(20);
  document.querySelector('body').style.backgroundColor = `#222`;
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.number').style.width = `15rem`;
  document.querySelector('.guess').value = ``;
  score = 20;
  number = Math.trunc(Math.random() * 20 + 1);
  console.log(number, 'Again pressed');
  enableInput();
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    displayMessage('No number!');
  } else if (guess === number) {
    displayMessage('🥳 CORRECT NUMBER!');
    document.querySelector('.number').textContent = number;
    document.querySelector('body').style.backgroundColor = `#60b347`;
    document.querySelector('.number').style.width = `30rem`;
    disableInput();
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== number) {
    if (score > 1) {
      displayMessage(guess > number ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💀 GAME OVER');
      document.querySelector('.score').textContent = `0`;
      disableInput();
    }
  }
});
