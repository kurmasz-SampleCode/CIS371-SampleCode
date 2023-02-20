const Toy = require('../models/Toy')
const ToyDB = require('../db/SqliteToyDB')

/* Demonstrates a simple implementation of standard CRUD operations */
class ToyController {

    async index(req, res) {
        // arrayOfToys is an array of Toy **objects**.
        // (i.e., more than an array of key/value pairs)
        let arrayOfToys = await ToyDB.allToys()
        res.render('toyIndex', { toys: arrayOfToys })
    }

    async show(req, res) {
        let id = req.params.id
        let toy = await ToyDB.find(id)

        if (!toy) {
            res.send('Could not find toy with id of ' + id)
        } else {
            res.render('toyShow', { toy: toy })
        }
    }

    newToy(req, res) {
        console.log('Controller::newToy ')
        res.render('toyNew', { toy: new Toy() })
    }

    async create(req, res) {
        console.log('About to create toy')
        console.log(req.body)
        let newToy = await ToyDB.create(req.body.toy)

        if (newToy.isValid()) {

            // Send a redirect to the "show" route for the new toy.
            res.writeHead(302, { 'Location': `/toys/${newToy.id}` })
            res.end()
        } else {
            res.render('toyNew', { toy: newToy })
        }
    }

    async edit(req, res) {
        let id = req.params.id
        let toy = await ToyDB.find(id)

        if (!toy) {
            res.send('Could not find toy with id of ' + id)
        } else {
            res.render('toyEdit', { toy: toy })
        }
    }

    async update(req, res) {
        let id = req.params.id
        let toy = await ToyDB.find(id)

        let testToy = new Toy(req.body.toy)
        if (!testToy.isValid()) {
            testToy.id = toy.id
            res.render('toyEdit', { toy: testToy })
            return;
        }

        if (!toy) {
            res.send('Could not find toy with id of ' + id)
        } else {
            toy.name = req.body.toy.name
            toy.description = req.body.toy.description
            toy.manufacturer = req.body.toy.manufacturer
            toy.price = req.body.toy.price

            console.log('About to call update')
            ToyDB.update(toy)

            // Send a redirect to the "show" route for the new toy.
            res.writeHead(302, { 'Location': `/toys/${toy.id}` })
            res.end()
        }
    }

    async rawIndex(req, res) {
        let toys = await ToyDB.allToys()
        res.send(toys)
    }
}

module.exports = ToyController