const students = [
    { firstName: "Ella", lastName: "Smith", gpa: 3.6, creditHours: 103 },
    { firstName: "Liam", lastName: "Johnson", gpa: 2.9, creditHours: 60 },
    { firstName: "Noah", lastName: "Williams", gpa: 3.8, creditHours: 30 },
    { firstName: "Olivia", lastName: "Brown", gpa: 3.2, creditHours: 75 },
    { firstName: "Emma", lastName: "Jones", gpa: 3.4, creditHours: 93 },
    { firstName: "Ava", lastName: "Garcia", gpa: 1.7, creditHours: 50 },
    { firstName: "Sophia", lastName: "Martinez", gpa: 2.8, creditHours: 80 },
    { firstName: "Isabella", lastName: "Davis", gpa: 3.5, creditHours: 60 },
    { firstName: "Mia", lastName: "Rodriguez", gpa: 1.0, creditHours: 40 },
    { firstName: "Amelia", lastName: "Hernandez", gpa: 3.9, creditHours: 105 }
];

//
// Notice that the two functions below are nearly identical. 
// The only difference is the "if" condition.
//
function filterForProbation(students, threshold) {
    const answer = []
    for (const student of students) {
        if (student.gpa < threshold) {
            answer.push(student)
        }
    }
    return answer
}

function filterByCreditHours(students, low, high) {
    const answer = []
    for (const student of students) {
        if (student.low >= low && student.high < high) {
            answer.push(student)
        }
    }
    return answer
}

//
// If we can pass code as a parameter, we can abstract the 
// two functions above:
//
function filter(students, filterCondition) {
    const answer = []
    for (const student of students) {
        if (filterCondition(student)) {
            answer.push(student)
        }
    }
    return answer
}

function onProbation(student) {
    return student.gpa < 2.0
}

function isSenior(student) {
    return student.creditHours >= 90
}

const seniors = filter(students, isSenior)
const toWarn = filter(students, onProbation)

console.log("Seniors: ", seniors)
console.log("On Probation", toWarn)

//
// So far, so good.  But, notice that we are writing an entire function that 
// is only used once: as a parameter to another function. 
//
// JavaScript allows you to create anonymous functions. These are called "lambdas"
//

const seniors_lambda = filter(students, (student) => student.creditHours >= 90)
const toWarn_lambda = filter(students, (student) => {return student.gpa < 2.0})

console.log("Seniors: ", seniors_lambda)
console.log("On Probation", toWarn_lambda)

//
// JavaScript lambdas are *not* limited to a single expression.
//


const gradedProbation = filter(students, (student) => {
    if (student.creditHours < 30) {
        return false;
    }
    if (student.creditHours < 60) {
        return student.gpa < 2.0
    }
    if (student.creditHours < 90) {
        return student.gpa < 2.25
    }
    return student.gpa < 2.5
})

//
// Closures
//
// You can use the idea of a closure to build more complex filters.
//

function makeCreditHourFilter(low, high) {
    return (student) => student.creditHours >= low && student.creditHours < high
}

