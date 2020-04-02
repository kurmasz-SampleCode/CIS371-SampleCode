import React from 'react'
import PropTypes from 'prop-types'

function AuthorListItem ({ author, onEditClicked, onDeleteClicked }) {
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
  )
}

AuthorListItem.propTypes = {
  author: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}

export default function AuthorList ({ authors, onEditClicked, onDeleteClicked }) {
  const authorItems = authors.map((author) => (
    <AuthorListItem key={author.id} author={author} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
  ))

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
  )
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}
