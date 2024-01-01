'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-04-29T21:31:17.178Z',
    '2023-05-02T07:42:02.383Z',
    '2023-05-03T09:15:04.904Z',
    '2023-05-04T10:17:24.185Z',
    '2023-05-05T14:11:59.604Z',
    '2023-05-06T17:01:17.194Z',
    '2023-05-07T23:36:17.929Z',
    '2023-05-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  // const hour = now.getHours();
  // const min = now.getMinutes();

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(Math.floor(daysPassed));

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBal = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formattedBal}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // const formattedIncomes = formatCur(incomes, acc.locale, acc.currency);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  // labelSumIn.textContent = `${formattedIncomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // const formattedOut = formatCur(Math.abs(out), acc.locale, acc.currency);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  // labelSumOut.textContent = `${formattedOut}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // const formattedInterest = formatCur(interest, acc.locale, acc.currency);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
  // labelSumInterest.textContent = `${formattedInterest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 10;
  // Call the timer every second
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    // In each call print remaining time
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds,stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // decrementing by 1s
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// experimenting api
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// const locale = navigator.language;
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // dates
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };
  // const locale = navigator.language;
  // console.log(currentAccount.locale);

  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    // start timer
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); // does type coercion and rounds to nearest integer value
  clearInterval(timer);
  timer = startLogOutTimer();

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      // receiverAcc.movementsDates.push(new Date());

      // Update UI
      updateUI(currentAccount);
    }, 3000);
    // // Add movement
    // currentAccount.movements.push(amount);

    // // add transfer date
    // currentAccount.movementsDates.push(new Date().toISOString());
    // // receiverAcc.movementsDates.push(new Date());

    // // Update UI
    // updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(0.3 === 0.30000000000000004);
// console.log(`parseInt`);
// console.log(Number.parseInt('35px', 10));
// console.log(Number.parseInt('e35px', 10));
// console.log(Number.parseInt('10h', 8));

// console.log(`parseFloat`);
// console.log(Number.parseFloat('35.3px', 10));
// console.log(Number.parseFloat('e35.5px', 10));
// console.log(Number.parseFloat('10.10h', 8));

// console.log(`isNaN`);
// console.log(Number.isNaN(20)); //false
// console.log(Number.isNaN('20')); //false
// console.log(Number.isNaN(+'20X')); //true
// console.log(Number.isNaN(23 / 0)); //true

// console.log(`isFinite`);
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite('20')); // false
// console.log(Number.isFinite(+'20X')); // false
// console.log(Number.isFinite(23 / 0)); // false

// console.log('isInteger');
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));
// console.log(Number.isInteger(10 / 3));
// console.log(Number.isInteger(3.3));

// console.log(`Dates`);
// const now = new Date();
// console.log(now);
// console.log(new Date('May 06 2023 11:42:48'));
// console.log(new Date('March 27 2000'));
// console.log(new Date('May 06 2023 11:42:48'));
// console.log(23 === 23.0);

//171
// console.log(Math.sqrt(81));
// console.log(25 ** (1 / 2));
// console.log(81 ** (1 / 2));

// .max and .min does type coercion but not parse
// console.log(Math.max(5, 18, '23', 11, 2));
// console.log(Math.min(5, 18, 23, 11, '2'));

// console.log(Math.PI * Number.parseFloat('10px') ** 2);
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// this is a random number gen func that can produce a number from and to as per arguments
// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min + 1)) + min;
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// // console.log(randomInt(0, 2));

// let element0 = [];

// for (let i = 0; i < 100; i++) {
//   element0[i] = randomInt(1, 6);
// }
// console.log(element0);
// console.log(element0.includes(0));
// console.log(element0.includes(1));
// console.log(element0.includes(2));
// console.log(element0.includes(3));
// console.log(element0.includes(4));
// console.log(element0.includes(5));
// console.log(element0.includes(6));
// console.log(element0.includes(7));

// console.log(Math.trunc(23.9)); // 23
// console.log(Math.round(23.9)); // 24
// console.log(Math.ceil(23.3)); // 24 rounded up
// console.log(Math.ceil(23.9)); // 24 rounded up
// console.log(Math.floor(23.3)); // 23 rounded down
// console.log(Math.floor('23.9')); // 23 rounded down / type coercion
// console.log(Math.trunc(-23.3));
// console.log(Math.trunc(-23.9));
// console.log(Math.floor(-23.3));
// console.log(Math.floor(-23.9));

// console.log((2.7).toFixed(0));
// console.log(+(2.7).toFixed(3));
// console.log((2.7356).toFixed(2));
// console.log(+(2.7636).toFixed(2)); // rounded up // floor
// console.log(+(2.7633).toFixed(2)); // rounded down // floor
// console.log((2.7).toFixed(0));

// console.log(5 % 2);

// console.log([...document.querySelectorAll('.movements__row')]);

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = '#E5E4E2';
//     }
//     if (i % 3 === 0) {
//       row.style.backgroundColor = '#D3D3D3';
//     }
//   });
// });

// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// // console.log(2 ** 53 + 3);
// console.log(90071992547409919007199254740991n);
// console.log(BigInt(90071992));

// // opertaions
// console.log(10000n + 10000n);
// console.log(6564554654646456565826589n * 100000000000n);

// const huge = 989552453654345432145545547n;
// const num = 23;
// console.log(huge * BigInt(num));

// console.log(20n == 20);
// console.log(20n === 20);
// console.log(typeof 20n);

// console.log(huge + ' is a bigint number');

// // Math operations does not work

// console.log(10n / 3n);
// console.log(10 / 3);

// create a date

// const now = new Date();
// console.log(now);

// console.log(new Date('dec 2022 12'));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2023, 2, 27, 9, 45, 3));
// console.log(new Date(2023, 10, 60));
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// // date methods

// const future = new Date(2023, 2, 27, 9, 45, 3);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(1679890503000));
// console.log(Date.now());
// future.setFullYear(2030);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
// console.log(days1);

/*const num = 3884764.23;

const options = {
  style: 'currency',
  // unit: 'celcius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat('en-US', options).format(num)
);*/

/*const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

setInterval(() => {
  const now = new Date();
  const hour = `${now.getHours()}`.padStart(2, '0');
  const min = `${now.getMinutes()}`.padStart(2, '0');
  const sec = `${now.getSeconds()}`.padStart(2, '0');

  console.log(`${hour}:${min}:${sec}`);
}, 1000);*/
