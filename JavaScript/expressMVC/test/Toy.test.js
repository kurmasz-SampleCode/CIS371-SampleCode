// IMPORTANT:  This is not a complete set of tests for Toy.js!!

const Toy = require('../Toy');


test('A valid toy', () => {
    let toy = new Toy({ name: 'bob', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(true);
});

test('Toy must have a name', () => {
    let toy = new Toy({ price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});

test('Toy name must be at least three characters', () => {
    let toy = new Toy({ name: 'ab', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});


test('Missing name sets error message', () => {
    let toy = new Toy({ price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
    toy.isValid();
    expect(toy.errors.length).toBe(1);
    expect(toy.errors[0]).toMatch(/The name must contain at least three characters/);
});

test('Toy must have a description', () => {
    let toy = new Toy({ name: 'Woody', price: 5, manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});

test('Toy description may not be an empty string', () => {
    let toy = new Toy({ name: 'Woody', price: 5, description: '', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});

test('Toy description may be as short as one character', () => {
    let toy = new Toy({ name: 'Woody', price: 5, description: 'x', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(true);
});

test('Missing description sets error message', () => {
    let toy = new Toy({ name: 'Woody', price: 5, manufacturer: 'Hasbro' });
    toy.isValid();
    expect(toy.errors.length).toBe(1);
    expect(toy.errors[0]).toMatch(/The toy must have a description./);
});

test('Toy must have a price', () => {
    let toy = new Toy({ name: 'Woody', description: 'hi', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});

test('Toy price must be numeric', () => {
    let toy = new Toy({ name: 'Woody', price: 'Mom', description: 'hi', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});

test('Toy price may not be negative', () => {
    let toy = new Toy({ name: 'Woody', price: '-0.0001', description: 'hi', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(false);
});

test('Toy price may be zero', () => {
    let toy = new Toy({ name: 'Woody', price: '0.0', description: 'hi', manufacturer: 'Hasbro' });
    expect(toy.isValid()).toBe(true);
});

test('Toy price must parse', () => {
    let toy = new Toy({ name: 'Woody', price: '201 Main Street', description: 'hi', manufacturer: 'Hasbro' });
    console.log(toy);
    expect(toy.isValid()).toBe(false);
});

test('isValid stores multiple errors', () => {
    let toy = new Toy({ name: 'Wo', price: '-5', description: 'hi', manufacturer: 'Hasbro' });
    toy.isValid();
    expect(toy.errors.length).toBe(2);
});

test('Toy.create saves the toy if valid', () => {
    let toysBefore = Toy.all().length;
    let newToy = Toy.create({ name: 'bob', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
    expect(Toy.all().length).toBe(toysBefore + 1);
    expect(newToy.id).toBeTruthy();
    expect(Toy.find(newToy.id)).toEqual(newToy);
});

test('Toy.create does save toy if not valid', () => {
    let toysBefore = Toy.all().length;
    let newToy = Toy.create({ name: 'bo', price: 5, description: 'unique', manufacturer: 'Hasbro' });
    expect(Toy.all().length).toBe(toysBefore);
    expect(newToy.id).toBeFalsy();
    expect(Toy.all().find((item) => item.description === 'unique')).toBeFalsy();
});