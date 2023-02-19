let SqliteToyDB = require('./SqliteToyDB')
console.log('sqliteToyDB')
console.log(SqliteToyDB)
let main = async() => {
    let rows = await SqliteToyDB.allToys()
    console.log(rows)
}
main()