// EXPORTING MODULE

console.log(`Exporting module`);

/*

console.log(`Start fetching users`);
const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
const data = res.json();
console.log(data);
console.log(`Finish fetching users`);

*/

const shippingCost = 10;
export const cart = [];
const totalPrice = 237;
const totalQuantity = 23;

export const addToCart = function (quantity, product) {
  cart.push({ quantity, product });
  console.log(`${quantity} ${product} added to cart`);
};
addToCart(9, 'something');
export { totalPrice, totalQuantity as tq };

export default function (quantity, product) {
  cart.push({ quantity, product });
  console.log(`${quantity} ${product} added to cart`);
}
