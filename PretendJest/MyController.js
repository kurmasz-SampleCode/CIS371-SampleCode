class MyController {

    constructor(db_in) {
        this.db = db_in
    }

    index(res) {
        const data = this.db.getData()
        res.render(data)
    }
}

module.exports = MyController