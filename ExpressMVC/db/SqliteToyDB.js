var sqlite3 = require('sqlite3').verbose()
let Toy = require('./Toy')

class SqliteToyDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Toys (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, manufacturer TEXT NOT NULL, price REAL NOT NULL);')
            this.db.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Barbie", "The doll", "Mattel", "23.19");')
            this.db.run('INSERT INTO Toys (name, description, manufacturer, price) VALUES ("Hot Wheels", "Toy Cars", "Mattel", "1.59");')
        })
    }

    static allToys() {
        return new Promise((resolve, _reject) => {
            this.db.all('SELECT * from Toys', (err, response) => {
                resolve(response.map((item) => new Toy(item)))
            })
        })
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Toys where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    resolve(new Toy(rows[0]))
                } else {
                    reject(`Id ${id} not found`)
                }
            })
        })
    }

    static create(description) {
        let newToy = new Toy(description)
        if (newToy.isValid()) {
            return new Promise((resolve, _reject) => {
                // Note:  In order to have access to this.lastID, you have to use function instead of the new arrow syntax.
                // See https://github.com/TryGhost/node-sqlite3/wiki/API
                this.db.run(`INSERT INTO Toys (name, description, manufacturer, price) VALUES ("${newToy.name}", "${newToy.description}", "${newToy.manufacturer}", "${newToy.price}")`,
                    function(_err, _data) {
                        newToy.id = this.lastID
                        resolve(newToy)
                    })
            })
        } else {
            return newToy
        }
    }

    static update(toy) {
        this.db.run(`UPDATE Toys SET name="${toy.name}", price="${toy.price}", description="${toy.description}", manufacturer="${toy.manufacturer}" where id="${toy.id}"`)
    }
}

SqliteToyDB.db = new sqlite3.Database('toys.sqlite')
module.exports = SqliteToyDB