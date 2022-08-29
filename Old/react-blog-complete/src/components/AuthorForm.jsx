import React from 'react'
import PropTypes from 'prop-types'

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired
}

export default function AuthorForm ({ author, updateAuthor, formMode, submitCallback, cancelCallback }) {
  const cancelClicked = (event) => {
    event.preventDefault()
    cancelCallback()
  }

  // The form will have two different sets of buttons:
  // * A "Create" button when creating, and
  // * An "Update" and "Cancel" button when updating.
  const renderButtons = () => {
    if (formMode === 'new') {
      return (
        <button id='create-button' type="submit" className="btn btn-primary">Create</button>
      )
    } else {
      return (
        <div className="form-group">
          <button id='save-button' type="submit" className="btn btn-primary">Save</button>
          <button id='cancel-button' type="submit" className="btn btn-danger" onClick={cancelClicked}>Cancel</button>
        </div>
      )
    }
  } // end renderButtons

  // In this version, the Authors component needs access to the state so it can initialize the
  // form fields when the edit button is clicked.  Therefore we move the state up.

  const formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault()
    submitCallback()
  }

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
  )
}
