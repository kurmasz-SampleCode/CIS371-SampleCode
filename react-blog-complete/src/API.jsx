// const apiURL = 'http://localhost:3001'
const apiURL = 'https://railsapi-kurmasz.codeanyapp.com'

export default class API {
  static fetchAuthors () {
    return fetch(`${apiURL}/authors`)
      .then(response => {
        // Notice: At this point, we have only the headers.  We can't
        // access the JSON data.
        console.log('Response from /authors ')
        console.log(response)

        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      })
      .then(data => {
        console.log('JSON data from /authors')
        console.log(data)
        return data
      })
  } // end fetchAuthors

  static postNewAuthor (author) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(author)
    }
    console.log('Attempting to post new author')
    console.log(author)
    return fetch(`${apiURL}/authors`, options).then(async response => {
      console.log('The POST response.')
      console.log(response)
      if (response.ok) {
        return response.json()
      } else if (response.status === 422) {
        const data = await response.json()
        console.log('Validation message: ')
        console.log(data)
        throw new Error(`Server validation failed: ${data.message}`)
      } else {
        throw new Error(`Got a ${response.status} status.`)
      }
    })
  }

  static updateAuthor (author) {
    const options = {
      // We use PUT instead of PATCH because we are replacing all of the fields.
      // If we were sending only the fields that changed, we'd use PATCH
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(author)
    }
    console.log('Attempting to update author')
    console.log(author)
    return fetch(`${apiURL}/authors/${author.id}`, options).then(
      async response => {
        console.log('The PUT response.')
        console.log(response)
        if (response.ok && response.status === 204) {
          return true
        } else if (response.status === 422) {
          const data = await response.json()
          console.log('Validation message: ')
          console.log(data)
          throw new Error(`Server validation failed: ${data.message}`)
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      }
    )
  } // end updateAuthor

  static deleteAuthor (id) {
    const options = {
      method: 'DELETE'
    }
    console.log('Attempting to delete author with id ' + id)
    return fetch(`${apiURL}/authors/${id}`, options).then(async response => {
      console.log('The DELETE response.')
      console.log(response)
      if (response.ok && response.status === 204) {
        return true
      } else {
        throw new Error(`Got a ${response.status} status`)
      }
    })
  } // end deleteAuthor
} // end class API
