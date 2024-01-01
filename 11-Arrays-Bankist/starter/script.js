'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// app code goes here_______

//<div class="movements__date">3 days ago</div>

const displayUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let sorted = false;

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // .textCotent = 0

  const movs = sort ? movements.slice().sort((a, b) => b - a) : movements;

  movs.forEach(function (mov, i) {
    const movType = mov > 0 ? `deposit` : `withdrawal`;

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
      <div class="movements__value">${mov}&euro;</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

// const user = 'Steven Thomas Williams';

createUsernames(accounts);
// console.log(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance} \u20ac`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (accs) {
  const totalDepositUSD = accs.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${totalDepositUSD} \u20ac`;
  const totalWithdrawalUSD = accs.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawalUSD)} \u20ac`;
  const interest = accs.movements
    .filter(mov => mov > 0)
    .map(curr => (curr * accs.interestRate) / 100)
    .filter(curr => curr >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest} \u20ac`;
  // console.log(interest);
};

// calcDisplaySummary(account1);

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // disp container
    containerApp.style.opacity = 1;
    // calc and disp bal
    calcDisplayBalance(currentAccount);
    // calc and disp summary
    calcDisplaySummary(currentAccount);
    // disp mov
    displayMovements(currentAccount.movements);
    // disp welcome
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
  }
});

// money transfer

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receviverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    amount < currentAccount.balance &&
    receviverAcc &&
    receviverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receviverAcc.movements.push(amount);

    // display reload
    displayUI(currentAccount);
  }
});

// loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  // clearing input field and removing focus
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);

    displayUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log('Acc closed!');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // delete account
    accounts.splice(index, 1);
    // hide ui
    containerApp.style.opacity = 0;
    // change focus
    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();
    labelWelcome.textContent = `Goodbye, ${currentAccount.owner.split(' ')[0]}`;
  }
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////

// const arr = ['a', 'b', 'c', 'd', 'e'];

//slice
// console.log('.....slice.....');
// console.log(arr.slice());
// console.log(arr.slice(2));
// console.log(arr.slice(0, 5));
// console.log(arr.slice(-5));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -1));
// console.log([...arr]);

//splice
// console.log('.....splice.....');
// console.log(arr.splice(2));
// console.log(arr);
// console.log(arr.splice(-1));
// console.log(arr);
// console.log(arr.splice(1, 3));
// console.log(arr);

//reverse
// console.log('.....reverse.....');
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2);
// console.log(arr2.reverse());
// console.log(arr2);

//concat
// console.log('.....concat.....');
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

//join
// console.log('.....join.....');
// console.log(letters.join(', '));

//143 at method

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));
// console.log(arr.at(-2));
// console.log('Jonas'.at(-1));

// 144 forEach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of
// console.log(`.....FOR OF.....`);
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// // for each
// console.log(`.....FOR EACH.....`);
// movements.forEach(function (movement, i) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

//145
// for each for sets and maps

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, currenciesMap) {
//   console.log(`${key}: ${value}`);
//   // console.log(currenciesMap);
// });

// const currenciesSets = new Set(['USD', 'EUR', 'USD', 'GBP', 'EUR', 'USD']);

// currenciesSets.forEach(function (value, _, currenciesSets) {
//   console.log(`${value}: ${value}`);
// });

//148 coding challenge #1
// Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// // const dogsJulia = [9, 16, 6, 8, 3];
// // const dogsKate = [10, 5, 6, 1, 4];

// const checkDogs = function (arr1, arr2) {
//   // const catsRemoved = arr1.slice(1, -2);
//   const catsRemoved = arr1.slice();
//   catsRemoved.splice(0, 1);
//   catsRemoved.splice(-2);
//   console.log(catsRemoved);
//   // const allDogs = [...catsRemoved, ...arr2];
//   const allDogs = catsRemoved.concat(arr2);
//   console.log(allDogs);
//   allDogs.forEach(function (age, i) {
//     console.log(
//       age > 3
//         ? `Dog number ${i + 1} is an adult, and is ${age} years old`
//         : `Dog number ${i + 1} is still a puppy 🐶, and is ${age} years old`
//     );
//   });
// };

// checkDogs(dogsJulia, dogsKate);

//150 the map method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// if (movement > 0) {
//   console.log(`Movement ${i + 1}: You deposited ${movement}`);
// } else {
//   console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
// }
const movementDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

// console.log(movementDescriptions);

const deposits = movements.filter(mov => mov > 0);
// console.log(movements);
// console.log(deposits);

const deposit2 = [];
for (const [i, mov] of movements.entries()) if (mov > 0) deposit2.push(mov);

// console.log(movements);
// console.log(deposit2);

const withdrawal = movements.filter(mov => mov < 0);
// console.log(withdrawal);

const balance = movements.reduce(function (acc, mov, i, arr) {
  // console.log(`Iteration ${i}: ${acc} + ${mov}`);
  return acc + mov;
}, 0);
// console.log(balance);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
// console.log(balance2);

const balance3 = movements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance3);

const max = movements.reduce(function (acc, curr) {
  if (curr > acc) return curr;
  else return acc;
}, movements[0]);
// console.log(movements);
// console.log(max);

// const max = movements.reduce(function (acc, curr, i) {
//   if (curr > acc) {
//     acc = curr;
//     console.log(`Iteration ${i}: ${acc} ${curr}`);
//     return acc;
//   }
// }, 0);
// console.log(movements);
// console.log(max);
const humanAge = [];
const calcAverageHumanAge = function (arr) {
  console.log(`Received array ${arr}`);
  arr.map(function (curr, i) {
    if (curr <= 2) humanAge.push(2 * curr);
    else if (curr > 2) humanAge.push(16 + curr * 4);
  });
  // console.log(`After map method ${humanAge}`);
  const humanAge2 = humanAge.filter(function (curr, i) {
    if (curr > 18) return curr;
  });
  // console.log(`After filter method ${humanAge2}`);
  const humanAgeAvg =
    humanAge2.reduce((acc, curr) => acc + curr) / humanAge2.length;
  // console.log(`After reduce method ${humanAgeAvg}`);
  return humanAgeAvg;
};
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

const arr1 = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge2 = arr =>
  arr
    .map(curr => (curr <= 2 ? 2 * curr : 16 + curr * 4))
    .filter(curr => curr >= 18)
    .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);
// console.log(final);

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));

const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

console.log(movements.find(mov => mov < 0));
console.log(accounts);
console.log(accounts.find(username => username.owner === 'Jonas Schmedtmann'));

let account;
function findAccount(acc) {
  for (acc of accounts) if (acc.owner === 'Jessica Davis') account = acc;
  console.log(account);
}
findAccount(accounts);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners);
console.log(owners.sort());

console.log(movements);
console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => b - a));

console.log([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));
const x = new Array(7);

console.log(x);
console.log(x.map(() => 5));
console.log(x);
x.fill(1);
console.log(x);
x.fill(2, 3, 5);
console.log(x);
x.fill(23, 2, 6);
console.log(x);
x.fill(-10, -2);
console.log(x);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);
const z = Array.from({ length: 8 }, (_, i) => i + 1);
console.log(z);

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementsUI);
  // console.log(movementsUI.map(el => el.textContent.replace('€', '')));
});

// const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);
console.log(bankDepositSum);

// 2.
// const bankDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const bankDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? acc + 1 : acc), 0);

console.log(bankDeposit1000);

let a = 10;
console.log(a++);
console.log(++a);

// test data for coding challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// task 1 adding a new property recommendedFood = weight ** 0.75 * 28.
dogs.forEach(
  obj => (obj.recommendedFood = Math.trunc(obj.weight ** 0.75 * 28))
);
console.log(dogs);

// dogs.forEach(obj => obj.owners.find(owner => owner === 'Sarah'));
// task 2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }.`
);

// task 3

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// task 4
// "Matilda and Alice and Bob's dogs eat too much!"
// "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

// task 5

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// task 6
// current > (recommended * 0.90) && current < (recommended * 1.10)

const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7
console.log(dogs.filter(checkEatingOkay));

// 8
const dogSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogSorted);
