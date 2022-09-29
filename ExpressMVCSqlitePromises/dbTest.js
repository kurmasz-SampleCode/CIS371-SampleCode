let ToyDB = require('./SqliteToyDBPromise');

console.log(ToyDB);

ToyDB.all().then((rows) => console.log(rows));


ToyDB.find(2).then((toy) => {
    console.log("Finding #2");
    console.log(toy)
});

ToyDB.find(12)
    .then((toy) => console.log("Error!  Somehow found unknown"))
    .catch((errorMsg) => console.log(`Got error message: "${errorMsg}"`));


// Because our two queries (below and above) are independent we can run them in parallel:
Promise.all([ToyDB.toysBelow(10), ToyDB.toysAbove(100)])
    .then((results) => {
        console.log("Queries run in parallel:");
        // Notice the results from each query are still separate.
        console.log(results)
    });

// We can combine the error checking into a single catch block
Promise.all([ToyDB.toysBelow(10), ToyDB.toysAbove("Spam")])
    .then((results) => {
        console.log("Queries run in parallel with error:");
        // Notice the results from each query are still separate.
        console.log(results)
    }).catch((errorMessage) => {
        console.log("There was a problem: " + errorMessage);
    });



// If our two queries are dependent (i.e. the second one relies on the result of the first), we can chain them.
// This time, my choice of "above" depends on the largest value returned by "Below".
// (Yes, this example below is contrived.  It was the best I could come up given the limited functionality of this example.)
ToyDB.toysBelow(10).then((toysBelow) => {
        let highPriceToy = toysBelow.sort((toy1, toy2) => {toy1.price - toy2.price}).at(-1)
        return ToyDB.toysAbove(highPriceToy.price)
    }).then((toysAbove) => { 
        console.log("Chained below/above");
        console.log(toysAbove)
    }).catch((errorMessage) => {
        console.log("Error message from chaining: " + errorMessage);
    });