const MemoryToyDB = require('../MemoryToyDB');

// Note: Technically the Toy object instantiated by .create should be mocked.

describe("MemoryToyDB", () => {
    describe(".create", () => {
        it('saves the toy if valid', () => {
            let toysBefore = MemoryToyDB.all().length;
            let newToy = MemoryToyDB.create({ name: 'bob', price: 5, description: 'a Toy', manufacturer: 'Hasbro' });
            expect(MemoryToyDB.all().length).toBe(toysBefore + 1);
            expect(newToy.id).toBeTruthy();
            expect(MemoryToyDB.find(newToy.id)).toEqual(newToy);
        });

        it('does save toy if not valid', () => {
            let toysBefore = MemoryToyDB.all().length;
            let newToy = MemoryToyDB.create({ name: 'bo', price: 5, description: 'unique', manufacturer: 'Hasbro' });
            expect(MemoryToyDB.all().length).toBe(toysBefore);
            expect(newToy.id).toBeFalsy();
            expect(MemoryToyDB.all().find((item) => item.description === 'unique')).toBeFalsy();
        });
    }); // end create

});