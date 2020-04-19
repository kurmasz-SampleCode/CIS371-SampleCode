// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')

const ToyController = require('./ToyController');
const toyController = new ToyController();

const UserController = require('./UserController');
const userController = new UserController();

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3000

/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');

/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));

// This sets a CORS header.
// (1) Don't worry about this until we get to AJAX.
// (2) Don't ever to "*" in production!!!

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "localhost:3001");
  next();
});

// If a route comes in that doesn't match anything else,
// express will look for a file in the public directory.
app.use(express.static(__dirname + '/public'))

/* Display all toys */
app.get('/toys', (req, res) => {
    toyController.index(req, res);
});

/* Create a new toy */
app.post('/toys', (req, res) => {
    toyController.create(req, res);
});

/* Display a form to create a new toy */
app.get('/toys/new', (req, res) => {
    toyController.newToy(req, res);
});


/* Display details for one toy.  
   :id represents a "route parameter" */
app.get('/toys/:id', (req, res) => {
    toyController.show(req, res);
});

/* Edit a toy */
app.get('/toys/:id/edit', (req, res) => {
    toyController.edit(req, res);
});

// Don't worry about this until we get to security  and middleware.
const {body} = require('express-validator')
const validations = [
    body('toy.name').escape(),
    body('toy.description').escape(),
    body('toy.manufacturer').escape(),
    body('toy.price').escape()
]
// Add validations as 2nd parameter to apply

/* Update a toy */
app.post('/toys/:id', (req, res) => {
    console.log("Update: ");
    console.log(req.body);
    toyController.update(req, res);
});

app.get('/selectUser', (req, res) => {
    userController.select(req, res);
});

app.post('/selectUser', (req, res) => {
    userController.showSelected(req, res);
});

app.get('/init', (req, res) => {
    require('./SqliteToyDB').initialize();
    res.send("Initialized.");
});

/*****************************************************
*
* The routes below are used for introducing AJAX. 
*
****************************************************** */

app.get('/toys.json', (req, res) => {
    toyController.rawIndex(req, res);
})

app.get('/pictures', (req, res) => {
    res.render('showSomePictures');
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
