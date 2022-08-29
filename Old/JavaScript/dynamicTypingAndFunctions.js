function myForEach(array, callback) {
    for (var i = 0; i < array.length; ++i) {
        callback(array[i]);
    }
}

var names = ["John", "Paul", "George", "Ringo"];

console.log("Method with functional parameter working as expected: ");
myForEach(names, (name) => console.log("Hello, " + name + "."));

console.log("");
console.log("Runtime error resulting from bad lambda:  We don't know until runtime that lastName will always be undefined.");
myForEach(names, (firstName, lastName) => console.log("Hello, " + firstName + " " + lastName + "."));