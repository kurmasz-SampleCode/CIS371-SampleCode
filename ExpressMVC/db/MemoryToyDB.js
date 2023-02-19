let Toy = require('./Toy')

class MemoryToyDB {

    // In a "real" app, the methods below would be DB accesses, not just a references to a static array.
    static allToys() {
        return this.toysList
    }

    static find(id) {
        return this.toysList.find((item) => item.id == id)
    }

    static create(toyDescription) {
        let newToy = new Toy(toyDescription)
        if (newToy.isValid()) {
            newToy.id = this.toysList.length + 1
            this.toysList.push(newToy)
        }
        return newToy
    }

    static update(_toy) {
        // Actually, we already modified the toy object.  There isn't anything that needs to be done here.
        // This method only exists to be consistent with the "real" DB class.
    }
}

MemoryToyDB.toysList = []
MemoryToyDB.create({ name: 'Barbie', description: 'The doll', price: 20.0, manufacturer: 'Mattel' })
MemoryToyDB.create({ name: 'Hot Wheels', description: 'Tiny cars', price: 1.50, manufacturer: 'Mattel' })
MemoryToyDB.create({ name: 'Playstation 4', description: 'A gaming console', price: 400, manufacturer: 'Sony' })
console.log(MemoryToyDB.toysList)

module.exports = MemoryToyDB