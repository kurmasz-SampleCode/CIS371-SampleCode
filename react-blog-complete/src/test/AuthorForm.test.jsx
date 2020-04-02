import React from 'react'
import { render } from '@testing-library/react'
import AuthorForm from '../components/AuthorForm'

describe('dummy', () => {
  it('does something', () => {

    function Dummy () {
      return <span>Dummy</span>
    }

    let stuff = render(<Dummy />)
  })
})

describe('AuthorForm', () => {

  let props
  beforeEach(() => {
    props = {
      author: { fname: '', lname: '', email: '' },
      updateAuthor: jest.fn(),
      formMode: 'new',
      submitCallback: jest.fn(),
      cancelCallback: jest.fn(),
    }
  })

  it('Initializes input fields to empty', () => {

    // Render Author form and keep the resulting DOM element.
    const { container } = render(<AuthorForm {...props} />)

    // Search the component for everything that matches the CSS 
    // selector "form input" (i.e., all the form inputs.)
    const inputElements = container.querySelectorAll('form input')

    // Assert that there are three of them.
    expect(inputElements.length).toBe(3)

    // Make sure each one is blank.
    inputElements.forEach((element) => expect(element.value).toEqual(''))
  })

  it('Initializes input fields when provided', () => {

    // Customize the props for this test.
    props.author = { fname: 'George', lname: 'Smith', email: 'g@smith.com' }

    // Render AuthorForm
    const { container } = render(<AuthorForm {...props} />)

    // Get fname input element, then verify it was initialized properly.
    const fnameInput = container.querySelector('#fname')
    expect(fnameInput.value).toBe('George')

    // Get lname input element, then verify it was initialized properly.
    const lnameInput = container.querySelector('#lname')
    expect(lnameInput.value).toBe('Smith')

    // Get email input element, then verify it was initialized properly.
    const emailInput = container.querySelector('#email')
    expect(emailInput.value).toBe('g@smith.com')
  })

  it('has "Create" button in "new" mode', () => {
    props.formMode = 'new';
    const { container } = render(<AuthorForm {...props} />)

    // Look for all the buttons.
    const buttons = container.querySelectorAll('form button');
    // There should be exactly one.
    expect(buttons.length).toBe(1);
    // It should be "Create"
    expect(buttons[0].textContent).toEqual('Create');
  })

  it('has "Save" and "Cancel" buttons in "update" mode', () => {
    props.formMode = 'update';
    const { container } = render(<AuthorForm {...props} />)

    // Look for all the buttons.
    const buttons = container.querySelectorAll('form button');
    // There should be exactly two.
    expect(buttons.length).toBe(2);
    console.log("The buttons:");
    console.log(buttons);
    let text = buttons.map((b) => b.textContent);
    // It should be "Create"
    expect(buttons[0].textContent).toEqual(['Save', 'Cancel']);
  })

})
