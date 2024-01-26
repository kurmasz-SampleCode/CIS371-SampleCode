// Demonstrates a couple of routes using send only

// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Notice that these next few lines of code don't have any immediate effect. 
  They are telling the server what function to call _when_ something "interesting"
  happens.
*/

function root_callback(_req, res) {
    res.send('<h1>Root</h1> Hello World!<br> (This is the root route)')
}
app.get('/', root_callback)

function about_callback(_req, res) {
    res.send('<h1>About</h1> This is an absurdly simple express server with two routes.')
}
app.get('/about', about_callback)

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))