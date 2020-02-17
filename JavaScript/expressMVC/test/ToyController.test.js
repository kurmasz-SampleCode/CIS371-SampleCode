const ToyController = require('../ToyController');

const Toy = require('../Toy');
jest.mock('../Toy');


let c;
let res;
let req;

let allToys = [new Toy({ name: "David", manufacturer: "Hasbro", description: "An action figure", price: "43.21" })];

beforeEach(() => {

    Toy.mockClear();
    Toy.all = jest.fn(() => allToys);

    c = new ToyController()
    req = {};
    res = {
        render: jest.fn(),
        send: jest.fn()
    }
});


describe("#index", () => {
    it("renders the index view", () => {
        c.index(req, res);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('toyIndex', { toys: allToys });
    });
});

describe("#show", () => {
    it("renders the show view for the given id if id is valid", () => {
        ken = new Toy({ name: 'Ken', manufacturer: "Mattel", description: "Companion", price: "0.65" });
        Toy.find = jest.fn((id) => id == 22 ? ken : null);

        req.params = { id: 22 };
        c.show(req, res);
        expect(res.send).toHaveBeenCalledTimes(0);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('toyShow', { toy: ken });
    });

    it("renders an error message if given id is not valid", () => {

        Toy.find = jest.fn((id) => id == 17 ? ken : null);
        req.params = { id: 31 };
        c.show(req, res);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledTimes(0);
        expect(res.send).toHaveBeenCalledWith("Could not find toy with id of 31");
    });
});




/*
test.only('#new renders new template', () => {
    c.newToy(req, res);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('toyNew', { toy: new Toy() });
    expect(Toy).toHaveBeenCalledTimes(1)
});

*/