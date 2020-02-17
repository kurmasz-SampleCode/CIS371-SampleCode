const ToyController = require('../ToyController');

const Toy = require('../Toy');
jest.mock('../Toy');


let c;
let res;
let req;

beforeEach(() => {

    Toy.mockClear();

    c = new ToyController()
    res = {
        render: jest.fn()
    }
    req = {}

});

test.only('#new renders new template', () => {
    c.newToy(req, res);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('toyNew', { toy: new Toy() });
    expect(Toy).toHaveBeenCalledTimes(1)
});