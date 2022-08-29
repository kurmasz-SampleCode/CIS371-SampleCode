import React from 'react'
import { render, act, fireEvent, waitForElementToBeRemoved, screen } from '@testing-library/react'
import API from '../API'
import Authors from '../components/Authors'

jest.mock('../API')
API.fetchAuthors = jest.fn(() => {
  let authors = [
    { id: 1, fname: 'Sam', lname: 'Jones', email: 'sam@jones.com' },
    { id: 2, fname: 'Fred', lname: 'Smith', email: 'fred@smith.com' }
  ]
  return new Promise((resolve) => resolve(authors))
})


describe('Authors', () => {

  it('initially displays the loading message', async () => {
    await act(async () => {
      let { getByText } = render(<Authors />)

      // will fail if component not found
      getByText('Loading...')
    })
  })

  it('loads authors when initialized', async () => {
    let { getByText } = render(<Authors />)

    // wait for the loading ... message to be removed.
    await waitForElementToBeRemoved(() => getByText('Loading...'))

    getByText("Sam")
    getByText("Jones")
    getByText("sam@jones.com")

    getByText("Fred")
    getByText("Smith")
    getByText("fred@smith.com")
  })

  // This is here to show you how it's done.  But, to me,
  // it looks more like an integration end-to-end test
  it('populates the form when "Edit" button clicked', async () => {
    let { container, getByText } = render(<Authors />)
    await waitForElementToBeRemoved(() => getByText('Loading...'))

    let found = container.querySelector('[data-id="1"] .edit-button')

    fireEvent.click(found)

    let fnameInput = container.querySelector('#fname')
    expect(fnameInput.value).toBe('Sam')

    let lnameInput = container.querySelector('#lname')
    expect(lnameInput.value).toBe('Jones')

    let emailInput = container.querySelector('#email')
    expect(emailInput.value).toBe('sam@jones.com')
  })
})