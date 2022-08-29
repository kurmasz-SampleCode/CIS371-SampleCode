var sqlite3 = require('sqlite3').verbose();

class AuthorDB {

    static initialize() {
        this.db.serialize(() => {
            // This will fail if the table exists (to prevent accidentally destroying existing data).
            this.db.run('CREATE TABLE Authors (id INTEGER PRIMARY KEY, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT NOT NULL);');
            this.db.run('INSERT INTO Authors (fname, lname, email) VALUES ("George", "Washington", "george@washington.com");');
            this.db.run('INSERT INTO Authors (fname, lname, email) VALUES ("John", "Adams", "john@adams.com");');
            this.db.run('INSERT INTO Authors (fname, lname, email) VALUES ("Thomas", "Jefferson", "thomas@jefferson.com");');
        });
    }

    static initializeTest() {
        this.db.serialize(() => {
            let createSQL = 'CREATE TABLE IF NOT EXISTS Authors (id INTEGER PRIMARY KEY, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT NOT NULL);'
            this.db.run(createSQL)
            this.db.run('DELETE FROM Authors')
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
        let sql = `INSERT INTO Authors (fname, lname, email) VALUES ("${author.fname}", "${author.lname}", "${author.email}");`;
        return new Promise((resolve, reject) => {
            console.log('The sql: ');
            console.log(sql);

            this.db.run(sql, function (err, rows) {
                console.log("This: ");
                console.log(this);
                if (err) {
                    console.log('Create Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...author })
                }
            });
        })
    }

    static update(author) {
        let sql = `UPDATE Authors SET fname="${author.fname}", lname="${author.lname}", email="${author.email}" WHERE id="${author.id}"`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function (err, rows) {
                if (err) {
                    console.log('Update Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    static delete(author) {
        let sql = `DELETE from Authors WHERE id="${author.id}"`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function (err, rows) {
                if (err) {
                    console.log('Delete Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    } // end delete
} // end AuthorDB

let dbName = 'blog.sqlite';
if (process.argv.find((item) => item === '--test')) {
    console.log("Running in test mode");
    dbName = 'blog.test.sqlite'
}

AuthorDB.db = new sqlite3.Database(dbName);

module.exports = AuthorDB;