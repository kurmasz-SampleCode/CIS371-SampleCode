// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module and instantiate the server */
const express = require('express')
const app = express()
const port = 3000

/* Import and instantiate the controller. */
const ToyController = require('./controllers/ToyController')
const toyController = new ToyController()

/* Parse the request body if there is POST data */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

/* Tell the server to use EJS by default */
app.set('view engine', 'ejs')

//
// Standard CRUD routes for Toy resource
//

/* Display all toys */
app.get('/toys', (req, res) => {
    toyController.index(req, res)
})

/* Display a form to create a new toy */
app.get('/toys/new', (req, res) => {
    toyController.newToy(req, res)
})

/* Display details for one toy.  
   :id represents a "route parameter" */
app.get('/toys/:id', (req, res) => {
    toyController.show(req, res)
})

/* Create a new toy */
app.post('/toys', (req, res) => {
    toyController.create(req, res)
})

/* Display form to edit a toy */
app.get('/toys/:id/edit', (req, res) => {
    toyController.edit(req, res)
})

/* Update a toy */
app.post('/toys/:id', (req, res) => {
    console.log('Update: ')
    console.log(req.body)
    toyController.update(req, res)
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
