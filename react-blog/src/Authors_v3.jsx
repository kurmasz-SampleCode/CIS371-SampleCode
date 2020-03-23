// Add the Authors Form
// Show how to set up a *controlled* component.
// Show how to set up a form submission callback
// Show how to configure a form to make a callback to a "higher" component.

import React from 'react';

function AuthorForm({submitCallback} ) {

  // For now, the form will be for Create only.
  // Later we will add an If statement to this function so it can change
  // based on whether we are creating or editing a user.
  let renderButtons = () => <button type="submit" className="btn btn-primary">Create</button>;

  let [fname, setFirstName] = React.useState('');
  let [lname, setLastName] = React.useState('');
  let [email, setEmail] = React.useState('');

  let formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault();
    submitCallback({ fname, lname, email });
  };

  return (
    <div className="author-form">
      <h1> Authors </h1>
      <form onSubmit={formSubmitted}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" autoComplete='given-name' name="fname" id="fname"
            placeholder="First Name" value={fname} onChange={(event) => setFirstName(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input type="text" className="form-control" autoComplete='family-name' name="lname" id="lname"
            placeholder="Last Name" value={lname} onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" autoComplete='email' name="email" id="email"
            placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  );
}

function AuthorListItem({ author }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{author.fname}</td>
      <td className="col-md-3">{author.lname}</td>
      <td className="col-md-3">{author.email}</td>
      <td className="col-md-3 btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => undefined}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
          </button>
        <button className="btn btn-danger btn-sm" onClick={event => undefined}>
          <i className="glyphicon glyphicon-remove"></i> Delete
          </button>
      </td>
    </tr>
  );
}


function AuthorList({ authors }) {
  const authorItems = authors.map((author) => (
    <AuthorListItem key={author.id} author={author} />
  ));

  return (
    <div className="author-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Email</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authorItems}
        </tbody>
      </table>
    </div>
  );
}

function Authors() {

  let [authorList, setAuthorList] = React.useState([
    { id: 1, fname: "Sam", lname: "Iam", email: "sam@aol.com" },
    { id: 2, fname: "Jane", lname: "Doe", email: "jane@aol.com" },
    { id: 3, fname: "Fred", lname: "Bear", email: "fred@aol.com" },
    { id: 4, fname: "Ted", lname: "Tooy", email: "ted@aol.com" },
  ]);

  let formSubmitted = (author) => {
    author.id = authorList.length + 1;
    setAuthorList([...authorList, author]);
  }

  return (
    <div className="authors">
      <AuthorForm submitCallback={formSubmitted} />
      <div />
      <AuthorList authors={authorList} />
    </div>
  );
}

export default Authors;