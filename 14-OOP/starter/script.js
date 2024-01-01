'use strict';

const Person = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
};

// STATIC METHODS
Person.hey = function () {
  console.log(`Hey there 👋`);
  console.log(this);
};

// 1. New {} is created
// 2. function is called, this = this New {}
// 3. this New {} is linked to prototype
// 4. function automatically returns this New {}

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// console.log(jonas, matilda, jack);
// console.log(jonas instanceof Person);
// console.log(matilda instanceof Person);
// console.log(jack instanceof Person);

// console.log(Person.prototype);
// console.dir(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// jonas.calcAge();
// matilda.calcAge();
// jack.calcAge();

// the following 1 statement is the step no. 3 of the new operator
// console.log(jonas.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(jack));

Person.prototype.species = 'Homo Sapiens';

// console.log(jonas.hasOwnProperty('fullName'));
// console.log(jonas.hasOwnProperty('birthYear'));
// console.log(jonas.hasOwnProperty('species'));

// console.log(Person.prototype.constructor === jonas.__proto__.constructor);

const arr = [3, 6, 58, 8, 5, 68, 54, 35, 4, 5, 6, 3];

// console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

// console.log(arr.unique());

const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

// CODING CHALLENGE #1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`Accelerated ${this.make} to ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`Braking ${this.make} to ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// bmw.accelerate();

// expression
// const PersonCl = class {}

// declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC METHODS
  static hey() {
    console.log(`Hey there 👋`);
    console.log(this);
  }
}

PersonCl.prototype.greetMessage = function () {
  console.log(`Hey ${this.firstName} // FROM OUT OF CLASS DECLARATION SCOPE`);
};

const jessica = new PersonCl('Jessica Davis', 1996);
const walter = new PersonCl('Walter Wild', 1996);

// GETTERS AND SETTERS

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// console.log(account.latest);
account.latest = 600;
// console.log(account.latest);
account.latest = -700;
// console.log(account.latest);
account.latest = 800;
// console.log(account.latest);
account.latest = 900;
// console.log(account.latest);

const str = 'This is an example of string';
// console.log(Array.from(str));

// CREATING OBJECTS USING OBJECT.CREATE

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2017;
// console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2000);

// CODING CHALLENGE #2

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`Accelerated ${this.make} to ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`Braking ${this.make} to ${this.speed} km/h`);
  }

  set speedUS(speedInMiles) {
    this.speed = speedInMiles * 1.6;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
}
const ford = new CarCl('Ford', 120);
// const mercedesCl = new Car('Mercedes', 95);

// console.log(ford);
// ford.accelerate();
// console.log(ford);
// ford.brake();
// console.log(ford);
// ford.accelerate();
// console.log(ford);
// ford.brake();
// console.log(ford);
// ford.accelerate();
// console.log(ford);
// ford.accelerate();
// console.log(ford);
// ford.brake();
// console.log(ford);

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(
    `Hey! my name is ${this.firstName} and I am studying ${this.course}`
  );
};
// console.log(Student.prototype.constructor);
Student.prototype.constructor = Student;
// console.log(Student.prototype.constructor);

const mike = new Student('Mike', 2000, 'Computer Science');
// mike.calcAge();

// CODING CHALLENGE #3

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `Accelerated ${this.make} to ${this.speed} km/h, charge ${this.charge}`
  );
};

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 100);

// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `Hey! my name is ${this.fullName} and I am studying ${this.course}`
    );
  }

  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear} years old, but I feel like ${
        2037 - this.birthYear + 10
      } `
    );
  }
}

const martha = new StudentCl('Martha Williams', 2017, 'Food & Nutrition');

// martha.calcAge();
// console.log(martha);
// const martha = new StudentCl('Martha Williams', 2017);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(
    `Hey! my name is ${this.fullName} and I am studying ${this.course}`
  );
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2017, 'Science');
// jay.introduce();
// jay.calcAge();

// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods

class Account {
  // 1. Public fields
  locale = navigator.language;

  // 2. Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    console.log(`Thanks for opening an account, ${owner}`);
    // Protected fields
    this.#pin = pin;
  }

  // Private methods
  #approveLoan(val) {
    return true;
  }

  // Public methods
  // Public interface
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdwaral(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Your loan of amount ${val} has been approved`);
      return this;
    }
  }

  getMovements() {
    return this.#movements;
  }

  // Static methods
  static helper() {
    console.log(`Static helper methods/functions`);
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(1000);
acc1.withdwaral(800);
acc1.deposit(3000);
acc1.deposit(3000);
acc1.requestLoan(500);
// acc1.approveLoan(600);
// console.log(acc1);
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// acc1.#approceLoan(100);
acc1.requestLoan(250);
console.log(acc1.getMovements());
// acc1.helper();
Account.helper();

// Chaining methods

acc1
  .deposit(300)
  .deposit(500)
  .withdwaral(35)
  .requestLoan(25000)
  .withdwaral(4000);

// CODING CHALLENGE #4

class EVCl extends CarCl {
  // PRIVATE FIELDS
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `Accelerated ${this.make} to ${this.speed} km/h, charge ${this.#charge}`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`Braking ${this.make} to ${this.speed} km/h`);
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(25).accelerate().brake();
rivian.speedUS = 35;
console.log(rivian.speed);
console.log(rivian.speedUS);

// console.log(rivian.#charge);
