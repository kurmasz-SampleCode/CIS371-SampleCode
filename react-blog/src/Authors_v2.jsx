// Set up state and display all the authors.

import React from 'react';

function AuthorForm(props) {
  return (
    <div className="author-form">
      Our Author Form Goes Here.
    </div>
  );
}

function AuthorListItem({author}) {
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


function AuthorList({authors})  {
  const authorItems = authors.map((author)  => (
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
      {id: 1, fname: "Sam", lname: "Iam", email: "sam@aol.com"},
      {id: 2, fname: "Jane", lname: "Doe", email: "jane@aol.com"},
      {id: 3, fname: "Fred", lname: "Bear", email: "fred@aol.com"},
      {id: 4, fname: "Ted", lname: "Tooy", email: "ted@aol.com"},
    ]);

  return (
    <div className="authors">
      <AuthorForm />
      <div/>
      <AuthorList authors={authorList} />
    </div>
  );
}

export default Authors;