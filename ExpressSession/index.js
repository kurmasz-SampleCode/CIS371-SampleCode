// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module and instantiate the server */
const express = require('express')
const app = express()
const port = 3000

/* Import and instantiate the controller. */
const ToyController = require('./controllers/ToyController')
const toyController = new ToyController()

const LoginController = require('./controllers/LoginController')
const loginController = new LoginController()


////////////////////////////////////////////////////////////
//
// "Session Stuff"
//
////////////////////////////////////////////////////////////

/* Import, then set express to use the session middleware */
const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'This should be a random, unguessable string'
}))

// middleware to determine if authenticated
function isAuthenticated(req, res, next) {

    console.log('Enter isAuthenticated')
    console.log(req.session)

    // If there is an active session, and that session has a user property,
    // continue to the requested route.
    if (req.session.user) {
        console.log('Already logged in... Moving on')
        next()
    } else {       
        console.log('Save current destination in session so we can continue on later: ' + req.originalUrl)
        req.session.returnTo = req.originalUrl

        console.log('redirecting to login page')
        res.redirect('/login')
    }
}



/* Parse the request body if there is POST data */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

/* Tell the server to use EJS by default */
app.set('view engine', 'ejs')

//
// Standard CRUD routes for Toy resource
//

/* Display all toys --- No login needed */
app.get('/toys', (req, res) => {
    toyController.index(req, res)
})

/* Display a form to create a new toy */
app.get('/toys/new', isAuthenticated, (req, res) => {
    console.log('Toys new index.js')
    toyController.newToy(req, res)
})

/* Display details for one toy.  
   :id represents a "route parameter" */
app.get('/toys/:id', isAuthenticated, (req, res) => {
    toyController.show(req, res)
})

/* Create a new toy */
app.post('/toys', isAuthenticated, (req, res) => {
    toyController.create(req, res)
})

/* Display form to edit a toy */
app.get('/toys/:id/edit', isAuthenticated, (req, res) => {
    toyController.edit(req, res)
})

/* Update a toy */
app.post('/toys/:id', isAuthenticated, (req, res) => {
    console.log('Update: ')
    console.log(req.body)
    toyController.update(req, res)
})

//
// Login routes
//

// Display the login form
app.get('/login', (req, res) => {
    loginController.loginPage(req, res)
})

// Respond to a submitted login
app.post('/login', (req, res) => {
    loginController.requestLogin(req, res)
})

// Logout
app.get('/logout', (req, res) => {
    loginController.logout(req, res)
})



/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
