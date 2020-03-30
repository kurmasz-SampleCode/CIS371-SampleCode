module.exports = class Author {

  static isValid(author, allAuthors) {

    let errors = [];
    if (!author.fname) {
      errors.push("Author must have a first name.");
    }

    if (!author.lname) {
      errors.push("Author must have a last name.");
    }

    if (!author.email) {
      errors.push("Author must have an email");      
    }

   if (!Author.isUnique(author.email, allAuthors)) {
     errors.push("Email is already in use.");
   }

   if (errors.length > 0) {
     author.errors = errors;
     return false;
   } else {
     return true;
   }
  }

  static isUnique(email, allAuthors) {
   return !allAuthors.find((author) => author.email === email);
  }
}