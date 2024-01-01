// IMPORTING MODULE

// import './shoppingCart.js';

/*

import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart(10, 'Bandages');
console.log(`totalPrice = ${price}, totalQuantity = ${tq}`);
// console.log(shippingCost);

*/

import * as ShoppingCart from './shoppingCart.js';

console.log(`Importing module`);

// console.log(ShoppingCart);
// ShoppingCart.addToCart(12, 'Bananas');
// ShoppingCart.addToCart(5, 'Apples');
// ShoppingCart.addToCart(5, 'Guavas');
// console.log(
//   `totalPrice = ${ShoppingCart.totalPrice}, totalQuantity = ${ShoppingCart.tq}`
// );

// // import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';

add(5, 'Pencils');
add(25, 'Colours');
add(2, 'Erasers');
// // console.log(price, tq);
console.log(cart);

// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();
// console.log(lastPost); // RETURNS A PROMISE SINCE FUNCTION ASYNC

// NOT VERY CLEAN
// lastPost.then(last => console.log(last));

// const data = await getLastPost();
// console.log(data);

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (quantity, product) {
    cart.push({ quantity, product });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (quantity, product) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart(10, 'Sweet lime');
ShoppingCart2.addToCart(12, 'Bananas');
console.log(ShoppingCart2);

/*

// NodeJs EXPORT

export.addToCart = function (quantity, product) {
  cart.push({ quantity, product });
  console.log(
    `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
  );
};

// NodeJs IMPORT
const {addToCart} = require('./shoppingCart.js')

*/

/*

ls / dir => list directory Mac/Linux / Windows

cd .. => up one directory

*/

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';
// import cloneDeep from 'lodash';
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);
state.user.loggedIn = false;

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');
// console.log('💥');
console.log('Jonas ' ?? null);
console.log(cart.find(el => el.quantity >= 10));

Promise.resolve(`Resolved promise 1`).then(res => console.log(res));

// import 'core-js/stable/array/find.js';
// import 'core-js/stable/promise';
import 'core-js/stable';

// Polifilling async functions
import 'regenerator-runtime/runtime';
