let ToyDB = require('./SqliteToyDB');

ToyDB.all((rows) => console.log(rows));


ToyDB.find(2, (toy) => {
    console.log("Finding #2");
    console.log(toy)
});

ToyDB.find(12, (toy) => {
    console.log("Finding unknown");
    console.log(toy)
});