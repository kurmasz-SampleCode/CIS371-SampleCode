import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AuthorForm from '../components/AuthorForm'

describe('AuthorForm', () => {

  let props
  let mockPreventDefault
  beforeEach(() => {
    props = {
      author: { fname: '', lname: '', email: '' },
      updateAuthor: jest.fn(),
      formMode: 'new',
      submitCallback: jest.fn(),
      cancelCallback: jest.fn(),
    }
    mockPreventDefault = jest.fn()
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
    const { container, getByLabelText } = render(<AuthorForm {...props} />)

    // Get fname input element, then verify it was initialized properly.
    const fnameInput = container.querySelector('#fname')
    expect(fnameInput.value).toBe('George')

    // Get lname input element, then verify it was initialized properly.
    const lnameInput = container.querySelector('#lname')
    expect(lnameInput.value).toBe('Smith')

    // Get email input element, then verify it was initialized properly.
    // getByLabelText is a different way to select the element.
    // querySelector is a standard DOM method
    // getByLabelText is a helper provided by the react testing library
    const emailInput = getByLabelText("Email address")
    expect(emailInput.value).toBe('g@smith.com')
  })

  it('has "Create" button in "new" mode', () => {
    props.formMode = 'new'
    const { container } = render(<AuthorForm {...props} />)

    // Look for all the buttons.
    const buttons = container.querySelectorAll('form button')
    // There should be exactly one.
    expect(buttons.length).toBe(1)
    // It should be "Create"
    expect(buttons[0].textContent).toEqual('Create')
  })

  it('has "Save" and "Cancel" buttons in "update" mode', () => {
    props.formMode = 'update'
    const { container } = render(<AuthorForm {...props} />)

    // Look for all the buttons.
    const buttons = container.querySelectorAll('form button')
    // There should be exactly two.
    expect(buttons.length).toBe(2)
    let textArray = Array.from(buttons).map((b) => b.textContent)
    expect(textArray).toEqual(['Save', 'Cancel'])
  })

  let types = ['fname', 'lname', 'email']
  types.forEach((inputType) => {
    it(`updates ${inputType} on every change`, () => {
      const { container } = render(<AuthorForm {...props} />)

      let input = container.querySelector(`#${inputType}`)

      fireEvent.change(input, { target: { value: 'newValue' } })
      expect(props.updateAuthor).toHaveBeenCalledWith(inputType, 'newValue')
    })
  })

  it('calls the submit callback when form submitted', () => {
    const { container } = render(<AuthorForm {...props} />)
    let form = container.querySelector('form')
    fireEvent.submit(form)
    expect(props.submitCallback).toHaveBeenCalledTimes(1)
  })

  it('calls the cancel callback when cancel button clicked.', () => {
    props.formMode = 'update'
    const { container, getByText } = render(<AuthorForm {...props} />)
    let cancelButton = getByText('Cancel')
    fireEvent.click(cancelButton)

    // Careful. Searching by text can make tests fragile. 
    // Changing the text breaks the test.  Adding classes or ids is better (in my opinion)
    expect(props.cancelCallback).toHaveBeenCalledTimes(1)
  })
})
