// Demonstrates a couple of routes using send only

// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')

/* Instantiate a server object*/
const app = express()
const port = 3000

/* Sample route returning a simple, static message.
   #send() simply sends the string to the client.  
   (Yes, I "cheated" by not sending a complete HTML file.)
*/
app.get('/', (req, res) => res.send('<h1>Root</h1> Hello World!<br> (This is the root route)'))

/* Another sample route returning a simple, static message. */
app.get('/about', (req, res) => res.send('<h1>About</h1> This is an absurdly simple express server with two routes.'))

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))