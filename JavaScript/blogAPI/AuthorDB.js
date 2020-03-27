var sqlite3 = require('sqlite3').verbose();

class AuthorDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Authors (id INTEGER PRIMARY KEY, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT NOT NULL);');
            this.db.run('INSERT INTO Authors (fname, lname, email) VALUES ("George", "Washington", "george@washington.com");');
            this.db.run('INSERT INTO Authors (fname, lname, email) VALUES ("John", "Adams", "john@adams.com");');
            this.db.run('INSERT INTO Authors (fname, lname, email) VALUES ("Thomas", "Jefferson", "thomas@jefferson.com");');
        });
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * from Authors', (err, rows) => {
                resolve(rows);
            });
        });
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Authors where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    console.log("resolving");
                    resolve(rows[0]);
                } else {
                    console.log("rejecting");
                    reject(`Author with Id ${id} not found`);
                }
            });
        });
    }

    static create(author) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO Authors (fname, lname, email) VALUES ("${author.fname}", "${author.lname}", "${author.email}");`;
            console.log('The sql: ');
            console.log(sql);
            this.db.run(sql, function(err, rows) {
                console.log("This: ");
                console.log(this);
                if (err) {
                    console.log('Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({newId: this.lastID})
                }
            });
        })
    }
}


AuthorDB.db = new sqlite3.Database('blog.sqlite');

module.exports = AuthorDB;