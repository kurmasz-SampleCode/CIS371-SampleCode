// Configure the edit button to populate the form with the desired Author data and process the update.

import React from 'react';

function AuthorForm({ author, updateAuthor, formMode, submitCallback, cancelCallback }) {

  let cancelClicked = (event) => {
    event.preventDefault();
    cancelCallback();
  }

  // The form will have two different sets of buttons:
  // * A "Create" button when creating, and 
  // * An "Update" and "Cancel" button when updating.
  let renderButtons = () => {
    if (formMode === "new") {
      return (
        <button type="submit" className="btn btn-primary">Create</button>
      );
    } else {
      return (
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={cancelClicked} >Cancel</button>
        </div>
      );
    }
  } // end renderButtons

  // In this version, the Authors component needs access to the state so it can initialize the 
  // form fields when the edit button is clicked.  Therefore we move the state up.

  let formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault();
    submitCallback();
  };

  return (
    <div className="author-form">
      <h1> Authors </h1>
      <form onSubmit={formSubmitted}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" autoComplete='given-name' name="fname" id="fname"
            placeholder="First Name" value={author.fname} onChange={(event) => updateAuthor('fname', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input type="text" className="form-control" autoComplete='family-name' name="lname" id="lname"
            placeholder="Last Name" value={author.lname} onChange={(event) => updateAuthor('lname', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" autoComplete='email' name="email" id="email"
            placeholder="name@example.com" value={author.email} onChange={(event) => updateAuthor('email', event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  );
}

function AuthorListItem({ author, onEditClicked, onDeleteClicked }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{author.fname}</td>
      <td className="col-md-3">{author.lname}</td>
      <td className="col-md-3">{author.email}</td>
      <td className="col-md-3 btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => onEditClicked(author)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
          </button>
        <button className="btn btn-danger btn-sm" onClick={event => onDeleteClicked(author.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
          </button>
      </td>
    </tr>
  );
}

function AuthorList({ authors, onEditClicked, onDeleteClicked }) {
  const authorItems = authors.map((author) => (
    <AuthorListItem key={author.id} author={author} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
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

  let [formMode, setFormMode] = React.useState("new");

  let emptyAuthor = { fname: '', lname: '', email: '' };
  let [currentAuthor, setCurrentAuthor] = React.useState(emptyAuthor);

  let updateAuthor = (field, value) => {
    let newAuthor = { ...currentAuthor }
    newAuthor[field] = value;
    setCurrentAuthor(newAuthor);
  }

  let formSubmitted = () => {
    if (formMode === "new") {
      currentAuthor.id = Math.max(...authorList.map((item) => item.id)) + 1;
      setAuthorList([...authorList, currentAuthor]);
    } else {
      let newAuthorList = [...authorList];
      let authorIndex = authorList.findIndex((author) => author.id === currentAuthor.id);

      newAuthorList[authorIndex] = currentAuthor;
      setAuthorList(newAuthorList);

      // Run this code instead to see that you have to clone objects
      // when updating state.
      if (false) {
        console.log("Here!");
        authorList[authorIndex] = currentAuthor;
        setAuthorList(authorList);
      }
    }
  }

  let editClicked = (author) => {
    setFormMode("update");
    setCurrentAuthor(author);
  }

  let cancelClicked = () => {
    setFormMode("new");
    setCurrentAuthor(emptyAuthor)
  }

  let deleteClicked = (id) => {
    setAuthorList(authorList.filter((item) => item.id !== id));

    // reset the form after someone clicks delete.
    cancelClicked();
  }

  return (
    <div className="authors">
      <AuthorForm formMode={formMode} author={currentAuthor} updateAuthor={updateAuthor}
        submitCallback={formSubmitted} cancelCallback={cancelClicked} />
      <div />
      <AuthorList authors={authorList} onEditClicked={editClicked} onDeleteClicked={deleteClicked} />
    </div>
  );
}

export default Authors;