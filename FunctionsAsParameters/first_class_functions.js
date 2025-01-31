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
    const answer = [];
    for (const student of students) {
        if (student.gpa < threshold) {
            answer.push(student);
        }
    }
    return answer;
}

function filterByCreditHours(students, low, high) {
    const answer = [];
    for (const student of students) {
        if (student.creditHours >= low && student.creditHours <= high) {
            answer.push(student);
        }
    }
    return answer;
}


//
// If we can pass code as a parameter, we can abstract the 
// two functions above:
//
function filter(theList, theFilter) {
    const answer = [];
    for (const item of theList) {
        if (theFilter(item)) {
            answer.push(item);
        }
    }
    return answer;
}

function isSenior(student) {
    return student.creditHours >= 90;
}

function onProbation(student) {
    return student.gpa < 2.0;
}

const seniors = filter(students, isSenior);
console.log(`Seniors:`, seniors);

const toWarn = filter(students, onProbation);
console.log(`On probation:`, toWarn);


//
// So far, so good.  But, notice that we are writing an entire function that 
// is only used once: as a parameter to another function. 
//
// Python allows you to create anonymous functions. These are called "lambdas"

seniors2 = filter(students, (s) => s.creditHours >= 90)
console.log(`Seniors 2:`, seniors2);

toWarn2 = filter(students, (s) => s.gpa < 2.0)
console.log(`On probation:`, toWarn2);

//
// JavaScript lambdas are *not* limited to a single expression.
//

gradedProbation = filter(students, (s) => {
    
    // You can't be on probation until 
    // you have completed 30 hours.
    if (s.creditHours < 30) {
        return false;
    }
    if (s.creditHours < 60) {
        return s.gpa < 2.0;
    }
    if (s.creditHours < 90) {
        return s.gpa < 2.25;
    }
    return s.gpa < 2.5
})
console.log(`On probation: ${gradedProbation}`);

//
// Closures
//
// You can use the idea of a closure to build more complex filters.

//

function makeGPAfilter(threshold) {
    return  (s) => s['gpa'] >= threshold;
}

const deansList = filter(students, (makeGPAfilter(3.0)))
console.log(`Students with 3.0 or better: `, deansList)

above_35 = filter(students, makeGPAfilter(3.5))
console.log(`Students with 3.5 or better:`, above_35)
