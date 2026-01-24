const ToyController = require('../controllers/ToyController')

const Toy = require('../models/Toy')
jest.mock('../models/Toy')

const ToyDB = require('../db/SqliteToyDB')
jest.mock('../db/SqliteToyDB')

describe('ToyController', () => {

    let c
    let res
    let req

    let allToys = [new Toy({ name: 'David', manufacturer: 'Hasbro', description: 'An action figure', price: '43.21' })]

    beforeEach(() => {
        jest.resetAllMocks()
        ToyDB.allToys = jest.fn(() => allToys)

        c = new ToyController()
        req = {}
        res = {
            render: jest.fn(),
            send: jest.fn()
        }
    })

    describe('#index', () => {
        it('renders the index view', async () => {
            await c.index(req, res)
            expect(res.render).toHaveBeenCalledTimes(1)
            expect(res.render).toHaveBeenCalledWith('toyIndex', { toys: allToys })
        })
    })

    describe('#show', () => {

        let ken  // notice that let is declared outside of beforeEach and the tests.
        beforeEach(() => {
            // a handy Toy to be used in each test.
            ken = new Toy({ name: 'Ken', manufacturer: 'Mattel', description: 'Companion', price: '0.65' })
        })

        it('renders the show view for the given id if id is valid', async () => {
            // mock ToyDB.find to return a known, local Toy when given the expected id.
            ToyDB.find = jest.fn((id) => id == 22 ? ken : null)

            // set up the req object as if the id was set to 22 in the URL.
            req.params = { id: 22 }

            // invoke the method to be tested.
            await c.show(req, res)

            // verify that we respond to the request as expected.
            expect(res.send).toHaveBeenCalledTimes(0)
            expect(res.render).toHaveBeenCalledTimes(1)
            expect(res.render).toHaveBeenCalledWith('toyShow', { toy: ken })
        })

        it('renders an error message if given id is not valid', async () => {
            Toy.find = jest.fn((id) => id == 17 ? ken : null)
            req.params = { id: 31 }
            await c.show(req, res)
            expect(res.send).toHaveBeenCalledTimes(1)
            expect(res.render).toHaveBeenCalledTimes(0)
            expect(res.send).toHaveBeenCalledWith('Could not find toy with id of 31')
        })
    })

    describe('#new', () => {
        it('renders the new template with a new toy', () => {
            c.newToy(req, res)

            // Verify that the constructor was called exactly once with no parameters.
            expect(Toy).toHaveBeenCalledTimes(1)
            expect(Toy).toHaveBeenCalledWith()

            // Grab the object that was returned by the constructor.
            let newToy = Toy.mock.instances[0]

            expect(res.render).toHaveBeenCalledTimes(1)
            expect(res.render).toHaveBeenCalledWith('toyNew', { toy: newToy })
        })
    })
})