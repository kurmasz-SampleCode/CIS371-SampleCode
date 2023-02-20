var sqlite3 = require('sqlite3').verbose();
var Toy = require('./Toy')

class SqliteToyDB {

    static initialize() {
        this.sqliteDB.serialize(() => {
            this.sqliteDB.run('CREATE TABLE Toys (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, manufacturer TEXT NOT NULL, price REAL NOT NULL);');
            this.sqliteDB.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Barbie", "The doll", "Mattel", "23.19");');
            this.sqliteDB.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Hot Wheels", "Toy Cars", "Mattel", "1.59");');
            this.sqliteDB.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Trek AL2", "Bicycle", "Trek", "1200");');
            this.sqliteDB.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Corvette", "Real Cars", "GM", "78000");');
        });
    }

    static allToys(callback) {
        this.sqliteDB.all('SELECT * from Toys', (err, rows) => {
            let toyArray = rows.map((row) => new Toy(row));
            callback(toyArray);
        });
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id, callback) {
        this.sqliteDB.all(`SELECT * from Toys where (id == ${id})`, (err, rows) => {

            console.log("Error is ")
            console.log(err);

            console.log("Rows is: ")
            console.log(rows);

            if (rows.length >= 1) {
                callback(new Toy(rows[0]));
            } else {
                callback(undefined);
            }
        });
    }

    static toysBelow(price, callback) {
        this.sqliteDB.all(`SELECT * from Toys where (price <= ${price})`, (err, rows) => {            
            let toyArray;
            if (!err) {
                toyArray = rows.map((row) => new Toy(row));
            }
            callback(toyArray, err);
        })
    }

    static toysAbove(price, callback) {
        this.sqliteDB.all(`SELECT * from Toys where (price >= ${price})`, (err, rows) => {            
            let toyArray;
            if (!err) {
                toyArray = rows.map((row) => new Toy(row));
            }
            callback(toyArray, err);
        })
    }



    // Demonstrates the nesting of callback (the beginning of "callback hell")
    // (Pretend that the two SQL statements can't be combined. In real life the need for 
    // nested callbacks happens, for example, when data is needed from two different 
    // databases or APIs.))
    //
    // Now, imagine what this could would look like if we added error handling.
    static extremes(below, above, callback) {
        this.sqliteDB.all(`SELECT * from Toys where (price <= ${below})`, (err, rowsBelow) => {            
            console.log("Toys below: " + rowsBelow.length());
            this.sqliteDB.all(`SELECT * from Toys where (price >= ${above})`, (err2, rowsAbove) => {
                console.log("Toys above: " + rowsAbove.length());
                let toyArray = [...rowsBelow, ...rowsAbove].map((row) => new Toy(row));
                callback(toyArray);
            })
        })
    }
}


SqliteToyDB.sqliteDB = new sqlite3.Database('toys.sqlite');

module.exports = SqliteToyDB;