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
        this.errors = [];
    }

    isValid() {
        this.errors = [];
        if (this.name.length <= 2) {
            this.errors.push("The name must contain at least three characters");
        }
        if (this.description.length <= 0) {
            this.errors.push("The toy must have a description.");
        }
        if (this.manufacturer.length <= 0) {
            this.errors.push("The toy must have a manufacturer.");
        }
        if (isNaN(parseFloat(this.price))) {
            this.errors.push("The price must be a number.");
        } else if (this.price < 0.0) {
            this.errors.push("The price must not be negative.");
        }
        return this.errors.length <= 0;
    }



    // In a "real" app, the methods below would be DB accesses, not just a references to a static array.

    static all() {
        return this.allToys;
    }

    static find(id) {
        return this.allToys.find((item) => item.id == id);
    }

    static create(toyDescription) {
        let newToy = new Toy(toyDescription);
        if (newToy.isValid()) {
            this.allToys.push(newToy);
        }
        return newToy;
    }
}

Toy.idCount = 0;
Toy.allToys = [new Toy({ name: 'Barbie', description: 'The doll', price: 20.0, manufacturer: 'Mattel' }),
    new Toy({ name: 'Hot Wheels', description: 'Tiny cars', price: 1.50, manufacturer: 'Mattel' }),
    new Toy({ name: 'Playstation 4', description: 'A gaming console', price: 400, manufacturer: 'Sony' })
];

console.log(Toy.allToys);

module.exports = Toy;