// Sample code showing how to use the spread (aka "...") operator with arrays.
// Available on GitHub: https://github.com/kurmasz-SampleCode/CIS371-SampleCode
// This example is in JavaScript/deconstructingArrays.js
// See Chapter 2 of the Porcello and Banks text for more examples of the ... operator.
// See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

// Example 1:  Setting a group of variables from a single array
console.log("Setting a group of variables from a single array");
let array1 = ['Apple', 'Banana', 'Pear', 'Orange'];
let array2 = ['Carrot', 'Potato', 'Radish', 'Pea'];

let [f1, f2] = array1;

console.log(`F1 is ${f1}.`);
console.log(`F2 is ${f2}.`);

// Here is a function that returns two values by putting them both in an array:
let convertKelvin = function(kelvin) {
    let c = kelvin - 273.15;
    let f = c * 9 / 5 + 32;
    return [c, f]
    // return {celsius: c, fahrenheit: f}
}

// Example 2: We can assign the two return values to separate variables
console.log()
console.log("We can assign the two return values to separate variables:");
let k = 0;

let [celsius, fahrenheit] = convertKelvin(k);
let [, fh2] = convertKelvin(k)

console.log(`${k} degrees Kelvin is ${celsius} degrees Celsius and ${fahrenheit} degrees Fahrenheit`)

// Example 3: Notice that when using an array variable, you are referring to the entire array object:
console.log();
console.log("An array variable refers to the entire array.");
console.log("Placing one array inside of another creates a multi-dimensional array:");
let combined = [array1, array2];
console.log(combined);
console.log("combined[0] is the entire array of fruit, *not* just 'Apple'")
console.log(combined[0]);

let twoParams = function(p1, p2) {
    console.log("First param: ");
    console.log(p1);
    console.log("Second param.");
    console.log(p2);
}

console.log();
console.log("Similarly, the first parameter to twoParams is the entire fruit array:");
twoParams(array1, array2);

// Example 4: The spread operator causes the array to behave as a sequence of separate variables.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

console.log()
console.log("Using ... causes one array to be inserted into another.");
console.log("Notice that there is a single, one-dimensional array.");
console.log("The vegetable array is concatenated onto the end of the fruit array.");
let combined2 = [...array1, ...array2];
console.log(combined2);
console.log("The first element is ");
console.log(combined2[0]);

console.log()
console.log("Similarly, using the ... syntax with a function parameter causes each array element to be ")
console.log("assigned to one function parameter.")
twoParams(...array1);

// Example 5: Using the spread operator in a function definition
console.log();
console.log("Finally, we can use the spread operator in a function definition to")
console.log("collect all the parameters into a single array.");

let collect = function(...params) {
    console.log("The parameters are");
    console.log(params);
}

collect('Fred', 'Barney', 'Wilma', 'Betty');