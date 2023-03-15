let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('toys.sqlite')

console.log('About to call all')
let all1 = db.all('SELECT * from Toys')
console.log('Notice that the return value is *not* the list of toys in the DB:')
// (Return value is db itself so calls can be chained.)
console.log(all1)
console.log('The only way to access the data is from a callback.')


// Misspell "SELECT" to see an example of an error.
db.all('SELECT * from Toys', (err, rows) => {
    console.log('-----------------------')
    console.log('Now, the rows are ready')
    console.log(rows.slice(0, 3)) //only print first 3 to keep output manageable
    if (err) {
        console.log(`There was an error "${err}"`)
    }
})

// Example error (SELECT misspelled).
db.all('SELEKT * from Toys', (err, rows) => {
    console.log('--------------------------------------')
    console.log('There should be an error and now rows:')
    console.log(rows)
    if (err) {
        console.log(`There was an error "${err}"`)
    }
})

// Example error (Toys misspelled).
db.all('SELECT * from Toyz', (err, rows) => {
    console.log('--------------------------------------')
    console.log('There should be an error and now rows:')
    console.log(rows)
    if (err) {
        console.log(`There was an error "${err}"`)
    }
})

console.log('Notice that this line runs *before* the rows are ready.')