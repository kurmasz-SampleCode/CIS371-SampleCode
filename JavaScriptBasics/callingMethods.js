
class Person {

    constructor(fname, lname) {
        this.fname = fname
        this.lname = lname
    }

    fullName() {
        if (this === undefined) {
            return "<'this' is undefined!!!>"
        }
        return `${this.fname} ${this.lname}`
    }

    display() {
        console.log("'this' in display is a " + this.constructor.name) 
        if (this.fullName) {       
            console.log(`\tHi, my name is ${this.fullName()}`)
        } else {
            console.log(`\t"this" does not have a fullName method`)
        }
    }
}

let fred = new Person('Fred', 'Smith')

// Notice that fred.fullName is a function.
console.log(fred.fullName)

// When calling a method the "normal" way, 
// the name of the object becomes the "this" 
// variable inside the method.
console.log(`"Normal" method call:\t ${fred.fullName()}`)

// Here is how I can invoke the method 
// without an object to become "this"
//
// This is what happens if you pass a method
// to a callback:  The callback doesn't invoke the 
// method on an object, so "this" is  undefined.
let aFunction = fred.fullName;
console.log(`Call without object:\t ${aFunction()}`)

// However, there are tricks we can use to fix this:
// (https://www.w3schools.com/js/js_function_call.asp)
let adHocPerson = {fname: 'Barb', lname: 'Erickson'}

// The "call" function allows us to specify "this" directly.
console.log(`Using "call":\t ${aFunction.call(adHocPerson)}`)


// We can also use "bind" to attach the object 
// before invoking.
// The new function is "bound" to adHocPerson
let newFunction = aFunction.bind(adHocPerson)

// so, when I invoke newFunction, adHocPerson is "this"
console.log(`Using "bind":\t ${newFunction()}`)

// I can use call or bind directly:
let result = fred.fullName.call({fname: 'George', lname: 'Washington' })
console.log(`Using "call" with anonymous object:\t${result}`)

let anotherFunction = fred.fullName.bind({fname: 'John', lname: 'Adams'});
console.log(`Using "bind" with anonymous object:\t${anotherFunction()}`)


// Notice that methods don't work as callbacks:
setTimeout(fred.display, 1000)
// But, we can use bind to fix the problem:
setTimeout(fred.display.bind(fred), 2000)



console.log(Person.prototype)

