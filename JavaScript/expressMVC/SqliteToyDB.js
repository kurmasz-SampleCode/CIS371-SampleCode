var sqlite3 = require('sqlite3').verbose();


class SqliteToyDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Toys (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, manufacturer TEXT NOT NULL, price REAL NOT NULL);');
            this.db.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Barbie", "The doll", "Mattel", "23.19");');
            this.db.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Hot Wheels", "Toy Cars", "Mattel", "1.59");');
        });
    }

    static async all() {
        let rows;
        this.db.serialize(() => {
            this.db.all('SELECT * from Toys', (err, rows) => {
                console.log("here 1");
                rows = rows;
            });
        });
        console.log("Here2");
        console.log(rows);
        return rows;
    }

}


SqliteToyDB.db = new sqlite3.Database('toys.sqlite');

module.exports = SqliteToyDB;