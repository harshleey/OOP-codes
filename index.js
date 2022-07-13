// Object literal is NOT a good way to duplicate objects if the object has at least one methods

// If an object has one or more methods, we say it has behavior


// EXAMPLE OF AN OBJECT LITERAL
let circle = {
 radius: 1,
 location: {
  x: 1,
  y: 1
 },
 draw : function() {
  console.log('draw')
 }
}
// circle.draw()

//A FACTORY FUNCTION 
function createCircle(radius) {
 return {
  radius,
  draw: function() {
   console.log('draw')
  }
 }
}
const newCircle = createCircle(1)
// newCircle.draw()

// CONSTRUCTOR FUNCTION
// this is basically a reference to the object that's excuting a piece of code
function Circular(radius) {
 console.log("this", this)
 this.radius = radius;
 this.draw = function() {
  console.log('draw');
 }
}

Circular.call({}, 1)
const anotherCircle = new Circular(1);

// The new operator creates an empty object 
// When the new operator is used to call a function, 3 things happen; First, the operator will create an empty object, then it will send "this" to point to that object and finally it will return that object from its function; 
// You do not need to return anything

// CONSTRUCTOR NOTE
//Internally, JS gives all object literal it's constructor
// Every object has a constructor property e.g
/* 
new String();
new Boolean();
new Number(); */

const Circle1 = new Function('radius', `
 this.radius = radius;
 this.draw = function() {
  console.log('draw');
 }`
);

const circle1 = new Circle1(1)

// let x = {}; JS will translate this into something like this: let x = new Object();

/* In JS, we have two categories of type; VALUE types(AKA Primitive) e.g Number, String, Boolean, Symbol(this is new), undefined and null AND OTHER SIDE we have REFERENCE TYPE e.g Object, Function and Array.
NOTE: Functions and arrays are also objects*/

/* When you assign an object to a variable, it's not directly stored into the variable, but somewhere else in the memeory and the address of that memory is stored into the variable. Therefore, variable actually serves as like an address/reference to the object. */

let number = 10;

function increase(number) { //the value of Number is copied into the parenthese
 number++; //However, this line is independent of the number value therefore it won't update
}

 increase(number)
 console.log(number); //Hence this will still log 10

 //Instead, do this;
 let obj = {value: 10};

 function increase(obj) {
  obj.value++;
 }

 increase(obj);
 console.log(obj)

// Primitive are value types and are copied by their value
// Reference type/Objects are copied by their reference

// Adding a property to an object
anotherCircle.location = { x: 1} //OR
anotherCircle['location'] = { x: 1};

const propertyName = 'center location';
anotherCircle[propertyName] = {x: 2}

// DELETING A PROPERTY
delete anotherCircle.location


// TO ITERATE AN OBJECT
// We use the for in loop for this
for (let key in anotherCircle) {
 console.log(key) //To get the key
 console.log(anotherCircle[key]) //To get the key values
 if (typeof anotherCircle[key] !== 'function') {
  console.log(key, anotherCircle[key])
 }
}

let keys = Object.keys(anotherCircle); //This returns an array
keys.forEach(element => {
 console.log(element)
});

// TO KNOW IF AN OBJECT HAS A GIVEN PROPERTY
// Use the in operator
if ('radius' in anotherCircle) {
 console.log('circle has radius')
}


// ABSTRACTION (HIDE THE DETAILS AND SHOW THE ESSENTIALS)
function Circumference(length) {
 //let color = 'red'; //this is only a local variable hence why we are not using 'this'

 this.length = length;

 // Before: this.defaultLocation = { x: 0, y: 0}; //We don't want this to be visible outside, hence we will be using let instead of 'this'.
 // After;
 let defaultLocation = { x: 0, y: 0};

 // let computeOptimumLocation = function(factor) {

 // }
this.getDefaultLocation = function() {
 return defaultLocation;
}

 this.draw = function() {
  // computeOptimumLocation(0.1);
//Closure determines what variable will be accessible to each function (This is different from a scope)
  console.log('draw')
 };

//  Object.defineProperty(this, 'defaultLocation', {
//   get: function() {
//   return defaultLocation;
//   },
//   set: function(value) {
//    if (!value.x || !value.y) 
//    throw new Error('Invalid location')
//    defaultLocation = value;
//   }
//  })
// }
// const circumference = new Circumference(10);
//circumference.computeOptimumLocation(0.1); //This line is not needed
// circumference.getDefaultLocation()
// It will be nicer to use circumference.defaultLocation instead
circumference.draw();
circumference.defaultLocation = 1;

// JSWAY NOTE
/* 
A class is an object-oriented abstraction for an idea or a concept manipulated by a program. It offers a convenient syntax to create objects representing this concept.

A JavaScript class is defined with the class keyword. It can only contain methods. The constructor() method, called during object creation, is used to initialize the object, often by giving it some data properties. Inside methods, the this keyword represents the object on which the method was called.
class MyClass {
  constructor(param1, param2, ...) {
    this.property1 = param1;
    this.property2 = param2;
    // ...
  }
  method1(.....) {
    // ...
   }
  
   // ...
 }
 JavaScript's OOP model is based on prototypes. Any JavaScript object has an internal property which is a link (a reference) to another object: its prototype. Prototypes are used to share properties and delegate behavior between objects.

When trying to access a property that does not exist in an object, JavaScript tries to find this property in the prototype chain of this object by first searching its prototype, then its prototype's own prototype, and so on.*/

// Create an object linked to myPrototypeObject
const myObject = Object.create(myPrototypeObject);

// If the prototype of an object does not have a desired property, then the search continues in the object's own prototype until we get to the end of the prototype chain. If the end of this chain is reached without having found the property, an attempted access to the property returns the value undefined.

const anObject = {
  myProp: 2
};

// Create anotherObject using anObject as a prototype
const anotherObject = Object.create(anObject);

// Create yetAnotherObject using anotherObject as a prototype
const yetAnotherObject = Object.create(anotherObject);

// myProp is found in yetAnotherObject's prototype chain (in anObject)
console.log(yetAnotherObject.myProp); // 2

// myOtherProp can't be found in yetAnotherObject's prototype chain
console.log(yetAnotherObject.myOtherProp); // undefined


// In class-based object-oriented languages like C++, Java and C#, classes are static blueprints (templates). When an object is created, the methods and properties of the class are copied into a new entity, called an instance. After instantiation, the newly created object has no relation whatsoever with its class.

// Following is how a fight will be handled. If attacked, a character sees their life points decrease from the strength of the attacker. If its health value falls below zero, the character is considered dead and cannot attack anymore. Its vanquisher receives a fixed number of 10 experience points.

// First, let's add the capability for our characters to fight one another. Since it's a shared ability, we define it as a method named attack() in the Character class.

class Character {
  constructor (name, health, strength) {
    this.name = name
    this.health = health
    this.strength = strength
    this.xp = 0
  }

  // Attack a target
  // If i attack a target, my strength will be down by the amount of damages made
  attack(target) {
    if (this.health > 0) {
      let damage = this.strength
      console.log(`${this.name} attacks ${target.name} and causes ${damage} damage points`)
      target.health -= damage
      if (target.health > 0) {
        console.log(`${target.name} has ${target.health} health points`)
      }
      else {
      target.health = 0
      const bonusXP = 10;
        console.log(
          `${this.name} eliminated ${target.name} and wins ${bonusXP} experience points`
        );
    }
  }
    else {
      console.log(`${this.name} can't attack (they've been eliminated)`);
    }
  }

  // Return the character description
  describe() {
    return `${this.name} has ${this.health} health points, ${this
      .strength} as strength and ${this.xp} XP points`;
  }
}

// const aurora = new Character("Aurora", 150, 25);
// const glacius = new Character("Glacius", 130, 30);

// console.log("Welcome to the adventure! Here are our heroes:");
// console.log(aurora.describe());
// console.log(glacius.describe());

// const monster = new Character("Spike", 40, 20);
// console.log("A wild monster has appeared: it's named " + monster.name);

// monster.attack(aurora);
// monster.attack(glacius);
// aurora.attack(monster);
// glacius.attack(monster);
