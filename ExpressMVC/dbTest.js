let SqliteToyDB = require('./SqliteToyDB')
let main = async() => {
    let rows = await SqliteToyDB.all()
    console.log(rows)
}
main()