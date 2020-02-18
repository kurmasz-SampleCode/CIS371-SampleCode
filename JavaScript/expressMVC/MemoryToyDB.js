let Toy = require('./Toy');

class MemoryToyDB {

    // In a "real" app, the methods below would be DB accesses, not just a references to a static array.
    static all() {
        return this.allToys;
    }

    static find(id) {
        return this.allToys.find((item) => item.id == id);
    }

    static create(toyDescription) {
        let newToy = new Toy(toyDescription)
        if (newToy.isValid()) {
            newToy.id = this.allToys.length;
            this.allToys.push(newToy);
        }
        return newToy;
    }
}

MemoryToyDB.allToys = [];
MemoryToyDB.create({ name: 'Barbie', description: 'The doll', price: 20.0, manufacturer: 'Mattel' });
MemoryToyDB.create({ name: 'Hot Wheels', description: 'Tiny cars', price: 1.50, manufacturer: 'Mattel' });
MemoryToyDB.create({ name: 'Playstation 4', description: 'A gaming console', price: 400, manufacturer: 'Sony' });
console.log(MemoryToyDB.allToys);

module.exports = MemoryToyDB;