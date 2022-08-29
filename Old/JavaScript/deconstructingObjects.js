// Sample code showing how to use the spread (aka "...") operator with objects.
// Available on GitHub: https://github.com/kurmasz-SampleCode/CIS371-SampleCode
// This example is in JavaScript/deconstructingObjects.js
// See Chapter 2 of the Porcello and Banks text for more examples of the ... operator.

// Example 1: Setting a group of variables from a single object.
let array1 = ['Apple', 'Banana', 'Pear', 'Orange'];
let [f1, f2, f3] = array1;
console.log('Remember that we can use the "[x, y, z] = array" syntax to grab multiple array elements at once.');
console.log(`f1 = ${f1}; f2=${f2}; f3=${f3}`);
console.log('We can do the same thing with objects:');
let myDog = {
    name: 'Fluffy',
    height: '23',
    weight: '5',
    breed: 'mutt',
    age: 12
};

let { name, breed, age } = myDog;
console.log(`name = ${name}; breed = ${breed}; age = ${age}`);
// This syntax is a short-cut because now we can simply use "name" instead of the longer "myDog.name".

// Example 2: This trick is more useful when passing an object to a function
console.log();
console.log('This trick can also be used when passing an object to a function:');

let printDog = function({ name, height, weight, breed, age }) {
    console.log(`My Dog's name is ${name}. He's a ${age}-year old ${breed} and weighs ${weight} kg.`);
}
printDog(myDog);

//return;

// Example 3: You can use this trick in reverse to create objects:
console.log();
console.log("You can use this trick in reverse to create objects.");
let fname = 'Bob';
let lname = 'Smith'
let occupation = 'mason';
let person = { fname, lname, occupation }
console.log("Notice that variable names become key names: ");
console.log(person);

let person2 = {
    fname: fname,
    lname: lname,
    occupation: occupation
}

// Example 4: The ... can be used to clone  objects.
console.log();
console.log("The ... operator can be used to clone objects.");
let dog2 = myDog; // This will create a reference to myDog
let dog3 = {...myDog }; // This will clone myDog

// Changing weight
myDog.weight = 7;
console.log("dog2 is just another name for myDog (notice his weight is now 7, also");
console.log(dog2);
console.log("dog3 is a separate object");
console.log(dog3);

// Example 5:  We can add properties when cloning objects:
console.log();
console.log("We can add properties when cloning objects.");
let superDog = {
    superPower: 'incapacitating stupidity',
    weakness: 'food',
    ...myDog
}
console.log(superDog);