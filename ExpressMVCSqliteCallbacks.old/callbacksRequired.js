let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(__dirname + 'toys.sqlite');

console.log("About to call all");
let all1 = db.all('SELECT * from Toys');
console.log("Notice that the return value is *not* the list of toys in the DB:");
console.log(all1);
console.log("The only way to access the data is from a callback.");

// Misspell "SELECT" to see an example of an error.
db.all('SELECT * from Toys', (err, rows) => {
    console.log("Now, the rows are ready");
    console.log(rows);
    if (err) {
        console.log(`There was an error "${err}"`)
    }
});

console.log("Notice that this line runs *before* the rows are ready.");