// Just display the basic outline of the components.

import React from 'react';

function AuthorForm() {
  return (
    <div className="author-form">
      Our Author Form Goes Here.
    </div>
  );
}

function AuthorList() {
  return (
    <div className="author-list">
      Our Author List Goes Here.
    </div>
  );
}

function Authors() {
  return (
    <div className="authors">
      <AuthorForm />
      <div/>
      <AuthorList />
    </div>
  );
}

export default Authors;