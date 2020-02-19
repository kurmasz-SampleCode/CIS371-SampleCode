const ToyController = require('../ToyController');

const Toy = require('../Toy');
jest.mock('../Toy');

const ToyDB = require('../MemoryToyDB');
jest.mock('../MemoryToyDB');


/*
const ToyDB = require('../SqliteToyDB');
jest.mock('../SqliteToyDB');
*/

let c;
let res;
let req;

let allToys = [new Toy({ name: "David", manufacturer: "Hasbro", description: "An action figure", price: "43.21" })];

beforeEach(() => {

    Toy.mockClear();
    ToyDB.mockClear();
    ToyDB.all = jest.fn(() => allToys);

    c = new ToyController()
    req = {};
    res = {
        render: jest.fn(),
        send: jest.fn()
    }
});

describe("#index", () => {
    it("renders the index view", async() => {
        await c.index(req, res);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('toyIndex', { toys: allToys });
    });
});

describe("#show", () => {

    let ken;
    beforeEach(() => {
        ken = new Toy({ name: 'Ken', manufacturer: "Mattel", description: "Companion", price: "0.65" });
    });

    it("renders the show view for the given id if id is valid", async() => {
        ToyDB.find = jest.fn((id) => id == 22 ? ken : null);
        req.params = { id: 22 };
        await c.show(req, res);
        expect(res.send).toHaveBeenCalledTimes(0);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('toyShow', { toy: ken });
    });

    it("renders an error message if given id is not valid", async() => {
        Toy.find = jest.fn((id) => id == 17 ? ken : null);
        req.params = { id: 31 };
        await c.show(req, res);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledTimes(0);
        expect(res.send).toHaveBeenCalledWith("Could not find toy with id of 31");
    });
});

describe("#new", () => {
    it("renders the new template with a new toy", () => {
        c.newToy(req, res);

        // Verify that the constructor was called exactly once with no parameters.
        expect(Toy).toHaveBeenCalledTimes(1);
        expect(Toy).toHaveBeenCalledWith();

        // Grab the object that was returned by the constructor.
        let newToy = Toy.mock.instances[0];

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('toyNew', { toy: newToy });
    });
});