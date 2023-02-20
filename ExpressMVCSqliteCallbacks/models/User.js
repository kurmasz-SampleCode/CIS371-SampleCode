class User {
    constructor(description) {
        // if description is null or undefined, we want to create an "empty" Toy object.
        if (description) {
            this.id = description.id
            this.fname = description.fname
            this.lname = description.lname
            this.email = description.email
        }
    }

    static all() {
        return User.allUsers
    }

    static find(id) {
        return User.allUsers.find((item) => item.id == id)
    }

    // Example of "deconstructing" an object
    static find2(theId) {
        return User.allUsers.find(({ id }) => theId === id)
    }
}

User.allUsers = [
    new User({ id: 1, fname: 'George', lname: 'Washington', email: 'george@washington.com' }),
    new User({ id: 2, fname: 'John', lname: 'Adams', email: 'john@adams.com' }),
    new User({ id: 3, fname: 'Thomas', lname: 'Jefferson', email: 'thomas@jefferson.com' }),
    new User({ id: 3, fname: 'James', lname: 'Madison', email: 'james@madison.com' }),
]

module.exports = User