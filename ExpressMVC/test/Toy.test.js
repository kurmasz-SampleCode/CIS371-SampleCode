// IMPORTANT:  This is not a complete set of tests for Toy.js!!

const Toy = require('../models/Toy');

// The "describe/it" style below is also used by Ruby's RSpec and Jasmine.
// Jest also lets you just say "test".

describe('Toy', () => {

    describe('.constructor', () => {
        it('should set all Toy properties', () => {
            let toy = new Toy({ name: 'bob', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            expect(toy.name).toBe('bob');
            expect(toy.price).toBe(5);
            expect(toy.description).toBe('a Toy');
            expect(toy.manufacturer).toBe('Hasbro');
        });
        it('should generate an empty error list', () => {
            let toy = new Toy({ name: 'bob', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            expect(toy.errors.length).toBe(0);
        });
    });

    describe('#isValid', () => {
        it('recognizes a valid toy', () => {
            let toy = new Toy({ name: 'bob', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(true);
        });

        it('recognizes a missing name as invalid', () => {
            let toy = new Toy({ price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        it('recognizes a name of fewer than three characters as invalid', () => {
            let toy = new Toy({ name: 'ab', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        it('sets the error message when the name is missing', () => {
            let toy = new Toy({ price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            toy.isValid();
            expect(toy.errors.length).toBe(1);
            expect(toy.errors[0]).toMatch(/The name must contain at least three characters/);
        });

        it('recognizes a missing description as invalid', () => {
            let toy = new Toy({ name: 'Woody', price: 5, manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        it('recognizes an empty description as invalid', () => {
            let toy = new Toy({ name: 'Woody', price: 5, description: '', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        it('accepts a one-character description', () => {
            let toy = new Toy({ name: 'Woody', price: 5, description: 'x', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(true);
        });

        it('sets an error message if the description is missing', () => {
            let toy = new Toy({ name: 'Woody', price: 5, manufacturer: 'Hasbro' });
            toy.isValid();
            expect(toy.errors.length).toBe(1);
            expect(toy.errors[0]).toMatch(/The toy must have a description./);
        });

        it('recognizes a missing price as invalid', () => {
            let toy = new Toy({ name: 'Woody', description: 'hi', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        test('declares a toy to be invalid if the price is not numeric', () => {
            let toy = new Toy({ name: 'Woody', price: 'Mom', description: 'hi', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        test('recognizes a toy with a negative price as invalid', () => {
            let toy = new Toy({ name: 'Woody', price: '-0.0001', description: 'hi', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(false);
        });

        test('recognizes a toy with a price of 0 as valid.', () => {
            let toy = new Toy({ name: 'Woody', price: '0.0', description: 'hi', manufacturer: 'Hasbro' });
            expect(toy.isValid()).toBe(true);
        });

        test('recognizes a price with mixed characters and numbers as invalid', () => {
            let toy = new Toy({ name: 'Woody', price: '201 Main Street', description: 'hi', manufacturer: 'Hasbro' });
            console.log(toy);
            expect(toy.isValid()).toBe(false);
        });

        test('stores multiple errors', () => {
            let toy = new Toy({ name: 'Wo', price: '-5', description: 'hi', manufacturer: 'Hasbro' });
            toy.isValid();
            expect(toy.errors.length).toBe(2);
        });
    }); // end #isValid


}); // end Toy