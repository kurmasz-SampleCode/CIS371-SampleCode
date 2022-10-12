"use strict";

console.log("All objects behave like associative arrays");

let myObject = {
    name: "Bob",
    age: 32
};
console.log(`Template strings can contain code:`);
console.log(`${myObject.name} will be ${myObject.age + 10} a decade from now.`)


console.log(`Original state of myObject:`);
console.log(myObject);
console.log("We can add a new key/value pair to the object:");
myObject.city = "Jenison";
console.log(`Members can be accessed in two ways: myObject.city or myObject["city"]`);
console.log(myObject.city);
console.log(myObject["city"]);
console.log("The second technique can be used to access members using a string:");
let desiredProperty = "age";
console.log(myObject[desiredProperty]);
console.log("Properties can be functions:");
myObject.speak = function() {
    console.log(`Hello, my name is ${this.name}.`);
};
myObject.speak();
console.log("Notice that this means we can add new methods to objects on the fly!");
console.log();

console.log("== vs ===");
let x = 4;
let y = "4";

console.log(`4 == "4":  ${x == y}`);
console.log(`4 === "4": ${x === y}`);
console.log('4 == "4" because when 4 is converted to a string, they are equal.');
console.log("Use === unless you have a good reason to use == (and comment it).");
console.log();


console.log("null vs undefined");
let u;
let n = null;
console.log(`undefined variable u: ${u}`);
console.log(`null variable n: ${n}`);
console.log(`u == n:  ${u == n}`);
console.log(`u === n: ${u === n}`);
console.log('u == n is true because both convert to "false"');
console.log('u === n is false because they are different types');
console.log("Remember to check for both null and undefined!.");
console.log();

// Demonstrating the nullish coalescing operator (??)
console.log(`The magic number is ${n ?? 'TBD'}`);

console.log("let vs var");

for (var i = 1; i < 10; ++i) {
    console.log(`${i}^2 = ${i*i}`);
}

console.log(`Notice that after the loop i=${i}`);
for (let j = 10; j < 20; ++j) {
    console.log(`${j}^2 = ${j*j}`);
}
console.log(`Notice that after the loop j is undefined: j=${j}`);