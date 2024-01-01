'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
//flight data

// const flight = flights.split('+');
// console.log(flight);

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`.padStart(50);
  console.log(output);
}

// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 12 + 12,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  // Frome here I have started writing my code

  order(straterIndex, mainIndex) {
    return [this.starterMenu[straterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ straterIndex = 1, mainIndex = 0, address, time = `20:00` }) {
    console.log(
      `Order received! ${this.starterMenu[straterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza(mainIngrediant, ...otherIngrediants) {
    console.log(mainIngrediant);
    console.log(otherIngrediants);
  },
};

///////////
// WORKING WITH STRINGS...

// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('Suvayan'[3]);

// console.log(airline.length);
// console.log('Suvayan'.length);

// console.log(airline.indexOf('A'));
// console.log(airline.lastIndexOf('A'));
// console.log(airline.indexOf('portugal'));
// console.log(airline.indexOf('Portugal'));

// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') console.log('You got a middle seat...');
//   else console.log('You got lucky');
// };

// checkMiddleSeat('11A');
// checkMiddleSeat('11B');
// checkMiddleSeat('11C');
// checkMiddleSeat('11D');
// checkMiddleSeat('11E');

// console.log(new String('suvayan'));
// console.log(typeof new String('suvayan'));
// console.log(typeof new String('suvayan').slice(1));

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// const passenger = function (name) {
//   const nameLower = name.toLowerCase();
//   const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);
//   console.log(nameCorrect);
// };

// passenger('suVayan MonDal');

// // comparing emails

// const email = 'hello@jonas.io';
// const loginEmail = '   Hello@Jonas.Io \n';
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // replacing

// const priceGB = '288,97';
// const priceUS = priceGB.replace(',', '.');
// console.log(priceGB, priceUS);
// const announcement =
//   'All passengers come to boarding door 23, boarding door 23!';

// console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));

// console.log(announcement.replace(/door/g, 'gate'));

///////////////////////////////////////////////////////////////////
//Maps

// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(1);

// const time = 10;
// console.log(rest.get(time >= rest.get('open') && time <= rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // rest.clear();
// const arr = [1, 2];
// rest.set(arr, 'Test');
// console.log(rest);
// console.log(rest.size);
// console.log(rest.get(arr));
// rest.set(document.querySelector('h1'), 'Heading');

////////////////////////////////////////////////////////////////////
/// Maps Continued

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
// console.log(question);

// // convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// // const answer = Number(prompt('Your answer'));
// // console.log(answer);
// // console.log(question.get(question.get('correct') === answer));

// console.log(...question);

///////////////////////////////////////////////////////////////////

// //sets

// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Pasta',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet);

// console.log(new Set('Suvayan'));
// console.log(new Set('Jonas'));

// console.log(ordersSet.size);

// console.log(ordersSet.has('bread'));
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('pizza'));

// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// console.log(ordersSet);
// console.log(ordersSet.size);

// ordersSet.delete('Risotto');
// console.log(ordersSet);
// console.log(ordersSet.size);

// // ordersSet.clear();
// // console.log(ordersSet);
// // console.log(ordersSet.size);

// for (const order of ordersSet) console.log(order);

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
// );

// console.log(new Set('SuvayanMondal').size);

/////////////////////////////////////////////////////////////////////

// property names
const properties = Object.keys(openingHours);
// console.log(properties);
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
// console.log(openStr);

// property values
const values = Object.values(openingHours);
// console.log(values);
const entries = Object.entries(openingHours);
// console.log(entries);

for (const [x, { open: timeOpen, close: timeClose }] of entries) {
  // console.log(`We are open on ${x}, from ${timeOpen} to ${timeClose}.`);
}

// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon);
// }
// if (restaurant.openingHours && restaurant.openingHours.fri) {
//   console.log(
//     restaurant.openingHours.fri.open,
//     restaurant.openingHours.fri.close
//   );
// }

// with optional chaining ?

// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? `closed`;
//   console.log(`On ${day} we are open at ${open}`);
// }

// // for methods

// console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);
// console.log(restaurant.orderRisotto?.(0, 1) ?? `Method does not exist`);

// // for arrays

// const users = [{ name: `Jonas`, email: 'hello@jonas.io' }];
// console.log(users[0]?.name ?? 'User array empty!');

// console.log(openingHours);
// console.log(restaurant);

// for of loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// for (const item of menu) console.log(item);

// for (const item of menu.entries()) console.log(item);

// console.log([...menu.entries()]);

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }
// && and ||

// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// // SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];
// console.log(arr);

// // REST, because of LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizz, , risso, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizz, risso, otherFood);

// // OBJECTS

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [125, 656, 89, 56, 56, 456];
// add(...x);

// restaurant.orderPizza('mushroom', 'onion', 'olives', 'spinach');

// Frome here I started writing code

// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// const ingrediants = [
//   // prompt("Let's make pasta! Ingrediant 1?"),
//   // prompt('Ingrediant 2?'),
//   // prompt('Ingrediant 3?'),
// ];
// console.log(ingrediants);

// restaurant.orderPasta(...ingrediants);

// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Jonas' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   straterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   straterIndex: 1,
// });

// const arr = [2, 3, 4];
// // const a = arr[0];
// // const b = arr[1];
// // const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// console.log(restaurant.order(2, 0));

// const [starterCourse, mainCourse] = restaurant.order(2, 0);
// console.log(starterCourse, mainCourse);

// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);

// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// const [p = 1, q = 1, r] = [8];
// console.log(p, q, r);

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// let a = 111;
// let b = 999;
// console.log(a, b);
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);
