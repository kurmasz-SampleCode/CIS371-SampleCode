/******************************************************************************
 * 
 * This file demonstrates the benefits (and pitfalls) of dynamic typing.
 *
 *****************************************************************************/

class Dog {

    bark() {
        console.log("Woof");
    }

    speak() {
        this.bark();
    }
}

class Duck {
    quack() {
        console.log("Quack")
    }

    speak() {
        this.quack();
    }
}



var dog = new Dog();
var duck = new Duck();

console.log("Round 1");
dog.bark();
duck.quack();

console.log();
console.log("Round 2");


// Benefit of dynamic typing:  We can put objects of different types into 
// an array.  Everything works as long as all the objects implement the method 
// in question.
var animals = [dog, duck];

animals.forEach((animal) => {
    animal.speak();
});

console.log();
console.log("Round 3");

// Pitfall: The compiler can't tell us when we've tried to call a method that doesn't exist.
// This bug is only discoverable at runtime.  
// If the code below were buried in if-statements, we might not even notice it until the code 
// had been production for a long time and a user just happened to enter an unfortunate combination of data.
animals.forEach((animal) => {
    animal.bark();
});