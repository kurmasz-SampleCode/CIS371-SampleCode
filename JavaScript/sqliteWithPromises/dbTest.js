let ToyDB = require('./SqliteToyDBPromise');

console.log(ToyDB);

ToyDB.all().then((rows) => console.log(rows));


ToyDB.find(2).then((toy) => {
    console.log("Finding #2");
    console.log(toy)
});

ToyDB.find(12).then((toy) => console.log("Error!  Somehow found unknown"),
    (errorMsg) => console.log(`Got error message: "${errorMsg}"`));