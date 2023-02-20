let ToyDB = require('./SqliteToyDB');

ToyDB.allToys((rows) => console.log(rows));


ToyDB.find(2, (toy) => {
    console.log("Finding #2");
    console.log(toy)
});

ToyDB.find(12, (toy) => {
    console.log("Finding unknown");
    console.log(toy)
});


// Demonstrates the nesting of callbacks.
// Two levels isn't too bad --- if you don't have to worry about errors.
ToyDB.toysBelow(10, (toysBelow) => {
    ToyDB.toysAbove(100, (toysAbove) => {
        let aboveAndBelow = [...toysBelow, ...toysAbove];
        console.log("Toys with extreme prices: ")
        console.log(aboveAndBelow);

    })
})


// Even two levels of nesting callbacks gets ugly if 
// you have to check for errors at each level.
ToyDB.toysBelow(10, (toysBelow, errBelow) => {
    if (errBelow) {
        console.log("There was a problem getting the low price:  " + errBelow);
    } else {
        ToyDB.toysAbove("Fish", (toysAbove, errAbove) => {
            if (errAbove) {
                console.log("There was an error getting the high prices: " + errAbove);
            } else {
                let aboveAndBelow = [...toysBelow, ...toysAbove];
                console.log("Toys with extreme prices: ")
                console.log(aboveAndBelow);        
            }
    })
    } // end else errBelow
})




/*
ToyDB.extremes(10, 100, (toys) => {
    console.log("Toys with extreme prices.")
    console.log(toys);
});
*/