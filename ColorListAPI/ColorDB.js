var sqlite3 = require('sqlite3').verbose()

class ColorDB {


    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Colors (pk INTEGER PRIMARY KEY, id TEXT NOT NULL, title TEXT NOT NULL, color INTEGER NOT NULL, rating INTEGER NOT NULL)')
            this.db.run('INSERT INTO Colors (id, title, color, rating) VALUES ("0175d1f0-a8c6-41bf-8d02-df5734d829a4", "ocean at dusk", "50402", "5")')
            this.db.run('INSERT INTO Colors (id, title, color, rating) VALUES ("83c7ba2f-7392-4d7d-9e23-35adbe186046", "lawn", "2534486", "3")')
            this.db.run('INSERT INTO Colors (id, title, color, rating) VALUES ("a11e3995-b0bd-4d58-8c48-5e49ae7f7f23", "bright red", "16711680", "0")')
        })
    }

    static allColors() {
        return new Promise( (resolve, reject) => {
            this.db.all('SELECT * from Colors', (err, response) => {            
                resolve(response);
            })
        })
    }

    static insertColor(color) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO Colors (id, title, color, rating) VALUES ("${color.id}", "${color.title}", "${color.color}", "0")`, function(err, data) {
                color.pk = this.lastID;
                resolve(color)
            })
        })
    }

    static updateColor(color) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Colors SET id="${color.id}", title="${color.title}", color="${color.color}" where pk="${color.pk}"`
            this.db.run(sql, function(err, data) {   
                if (err != null) {
                    console.log("Error updating ");
                    console.log(color);
                    console.log(err);
                    reject({message: err})
                } else if (this.changes === 1) {
                    resolve("Success")
                } else {
                    reject("Unknown problem.  There were " + this.changes + "changes.")
                }
            })
        })
    }
}

ColorDB.db = new sqlite3.Database('colors.sqlite');

module.exports = ColorDB;