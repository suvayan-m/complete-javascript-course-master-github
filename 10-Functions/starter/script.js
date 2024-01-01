'use strict';

// video default parameters
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 1000);

//video 131 functions accepting callback functions

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const firstWordUpper = function (str) {
//   let [firstWord, ...otherWords] = str.split(' ');

//   return [firstWord.toUpperCase(), ...otherWords].join(' ');
// };
// oneWord(`Hey there I'm using WhatsApp`);
// firstWordUpper(`Hey there I'm using WhatsApp`);

// const transform = function (str, fn) {
//   console.log(`Original String: ${str}`);
//   console.log(`Transformed String: ${fn(str)}`);
//   console.log(`Function used: ${fn.name}`);
// };
// transform(`Hello World, I am USING VScode`, firstWordUpper);
// transform(`Hello World, I am USING VScode`, oneWord);

// const high5 = function () {
//   console.log('Clicked on BODY');
// };
// document.body.addEventListener('click', high5);

// video 132 func returning func

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeter = greet('Hey');
// greeter('Jonas');
// greeter('Steven');

// greet('Hello')('Jio');

// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hello')('greetArr');

// video 133 the call and apply method
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}, ${name}` });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swisss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

//Apply method

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// 134 bind method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Williams');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
*/

/* coding challenge #1 of this section */

const registerNewAnswer = function () {
  const optionsStr = this.options.join('\n');
  const reply = Number(
    prompt(`${this.question}\n${optionsStr}\n(Write option number)`)
  );
  console.log(typeof reply);
  if (reply >= 0 && reply < this.answers.length) {
    this.answers[reply]++;
  } else {
    alert(
      `Wrong answer '${reply}'\nAnswer should be from 0 to ${
        this.options.length - 1
      }`
    );
  }
  const newDisplayResults = displayResults.bind(this);
  // newDisplayResults();
  newDisplayResults('string');
};

const displayResults = function (type = 'array') {
  if (type === 'string')
    // console.log(`Poll results are ${this.answers.join(', ')}`);
    alert(`Poll results are ${this.answers.join(', ')}`);
  else if (type === 'array')
    // console.log(this.answers);
    alert(this.answers);
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  // registerNewAnswer,
};

// registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', registerNewAnswer.bind(poll));

// Test data for bonus:
//  Data 1: [5, 2, 3]
//  Data 2: [1, 5, 3, 9, 6, 1]

// displayResults.call({ answers: [5, 2, 3] });
// displayResults.call({ answers: [5, 2, 3] }, 'string');
// displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// 136 IIFE

// const runOnce = function () {
//   console.log('This will never run again Norm');
// };

// // runOnce();
// // runOnce();

// (function () {
//   console.log('This will never run again Exp Ver.');
// })();

// (() => {
//   console.log('This will never run again Arrow Ver.');
// })();

// 137

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();

// document.body.addEventListener('click', () => {
//   console.log('Body was clicked!');
//   header.style.color = '#fff';
// });
