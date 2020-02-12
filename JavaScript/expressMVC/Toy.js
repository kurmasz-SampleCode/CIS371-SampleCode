class Toy {

    name;
    description;
    price;
    manufacturer;

    constructor(description) {
        // if description is null or undefined, we want to create an "empty" Toy object.
        if (description) {
            this.id = ++Toy.idCount;
            this.name = description.name;
            this.description = description.description;
            this.price = description.price;
            this.manufacturer = description.manufacturer;
        }
    }


    static all() {
        // In a "real" app, this would be a DB access, not just a reference to a static array.
        return this.allToys;
    }

    static find(id) {
        return this.allToys.find((item) => item.id == id);
    }

    static create(toyDescription) {
        let newToy = new Toy(toyDescription);
        this.allToys.push(newToy);
        return newToy;
    }

}

Toy.idCount = 0;
Toy.allToys = [new Toy({ name: 'Barbie', description: 'The doll', price: 20.0, manufacturer: 'Mattel' }),
    new Toy({ name: 'Hot Wheels', description: 'Tiny cars', price: 1.50, manufacturer: 'Mattel' })
];

console.log(Toy.allToys);

module.exports = Toy;