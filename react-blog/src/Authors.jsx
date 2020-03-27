import React from 'react';

function AuthorForm(props) {

  //let [fname, setFname] = React.useState(props.author.fname);
  let [lname, setLname] = React.useState(props.author.lname);
  let [email, setEmail] = React.useState(props.author.email);
  let [id, setId] = React.useState(props.author.id);

  let renderButtons = () => {
    if (props.formMode === "new") {
      return (
        <button type="submit" className="btn btn-primary">Create</button>
      );
    } else {
      return (
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={(x) => x} >Cancel</button>
        </div>
      );
    }
  };

  return (
    <div className="author-form">
      <h1> Authors </h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        let fname = props.author.fname;
        props.onSubmit({ fname, lname, email, id });
      }}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" autoComplete='given-name'
            name="fname" id="fname" placeholder="First Name" value={props.author.fname} onChange={(event) => props.setFname(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input type="text" className="form-control" autoComplete='family-name'
            name="lname" id="lname" placeholder="Last Name" value={lname} onChange={(event) => setLname(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" autoComplete='email'
            name="email" id="email" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  );
}

function AuthorListItem(props) {
  return (
    <tr>
      <td>{props.fname}</td>
      <td>{props.lname}</td>
      <td>{props.email}</td>
      <td className="btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => props.onEdit("update", { fname: props.fname, lname: props.lname, email: props.email, id: props.id })}>
          Edit
          </button>
        <button className="btn btn-danger btn-sm" onClick={event => console.log("Nothing yet")}>
          Delete
          </button>
      </td>
    </tr>
  );
}


function AuthorList(props) {
  const authorItems = props.authors.map((author) => {
    return (
      <AuthorListItem
        fname={author.fname}
        lname={author.lname}
        email={author.email}
        id={author.id}
        key={author.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="author-list container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
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
  let [authors, setAuthors] = React.useState([
    { id: 1, fname: "sam", lname: "iam", email: "sam@aol.com" },
    { id: 2, fname: "jane", lname: "doe", email: "jane@aol.com" },
    { id: 3, fname: "fred", lname: "bear", email: "fred@aol.com" },
    { id: 4, fname: "ted", lname: "tooy", email: "ted@aol.com" },
  ]);

  let [formMode, setFormMode] = React.useState("new");

  let [currentAuthor, setCurrentAuthor] = React.useState({ id: 0 });


  let formSubmitted = (author) => {
    if (formMode === "new") {
      // Remember, we don't *modify* state, we *replace* it.
      setAuthors([...authors, author]);
    } else {
      console.log("Updating: ");
      console.log(author);
    }
  };

  let updateForm = (mode, author) => {
    setFormMode(mode);
    setCurrentAuthor(author);
  }


  return (
    <div className="authors">
      <AuthorForm formMode={formMode} author={currentAuthor} onSubmit={formSubmitted} />
      <AuthorList authors={authors} onEdit={(mode, author) => updateForm(mode, author)} />
    </div>
  );
}

export default Authors;