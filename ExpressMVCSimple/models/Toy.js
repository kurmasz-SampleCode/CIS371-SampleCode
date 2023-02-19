class Toy {

    constructor(description) {
        // if description is null or undefined, we want to create an "empty" Toy object.
        if (description) {
            this.id = description.id
            this.name = description.name
            this.description = description.description
            this.price = description.price
            this.manufacturer = description.manufacturer
        }
        this.errors = []
    }

    isValid() {
        this.errors = []
        if (!this.name || this.name.length <= 2) {
            this.errors.push('The name must contain at least three characters')
        }
        if (!this.description || this.description.length <= 0) {
            this.errors.push('The toy must have a description.')
        }
        if (!this.manufacturer || this.manufacturer.length <= 0) {
            this.errors.push('The toy must have a manufacturer.')
        }

        // parseFloat(this.price) != this.price will detect cases like this"  parseFloat("201 Main street")
        // where the returned value (201) is not the entire string.  Notice the use of == to compare the number
        // and the string.
        if (!this.price) {
            this.errors.push('The toy must have a price.')
        } else if (isNaN(parseFloat(this.price)) || parseFloat(this.price) != this.price) {
            this.errors.push('The price must be a number.')
        } else if (this.price < 0.0) {
            this.errors.push('The price must not be negative.')
        }
        return this.errors.length <= 0
    }
}

module.exports = Toy