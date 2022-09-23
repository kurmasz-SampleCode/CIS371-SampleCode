let students = [
    { name: "John", gpa: 3.5, major: 'math', standing: 'freshman' },
    { name: "David", gpa: 3.7, major: 'chemistry', standing: 'sophomore' },
    { name: "Nathan", gpa: 2.7, major: 'physics', standing: 'junior' },
    { name: "Jonathan", gpa: 2.1, major: 'engineering', standing: 'senior' }
];


console.log("Students by name: ");
students.sort((a, b) => a.name.localeCompare(b.name));
console.log(students);

console.log("Students by gpa: ");
students.sort((a, b) => a.gpa - b.gpa);
console.log(students);

//
// The trick is how to write a generic "sortStudent" method where the field is a parameter
//

let sortStudents = function(students, field) {

    // notice that the anonymous compare function has access to the 
    // field variable from the enclosing scope.
    // IMPORTANT:  localCompare is for strings.  It only works on GPA because the values are all >0 and < 10
    students.sort((a, b) => a[field].localeCompare(b[field]));
    return students;
}

console.log("Students by name (v2):");
sortStudents(students, "name");
console.log(students);

console.log("Students by major:");
sortStudents(students, "major");
console.log(students);