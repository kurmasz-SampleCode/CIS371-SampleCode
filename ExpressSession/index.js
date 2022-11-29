// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')
const session = require('express-session')

const ToyController = require('./ToyController')
const toyController = new ToyController()

const UserController = require('./UserController')
const userController = new UserController()

const LoginController = require('./LoginController')
loginController = new LoginController()

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser')

/* Instantiate a server object*/
const app = express()
const port = 3000

/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');

/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));

/* Set express to use the session middleware */
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'This should be a random, unguessable string'
}))

// middleware to test for authentication
// middleware to test if authenticated
function isAuthenticated(req, res, next) {

    console.log('Enter isAuthenticated')
    console.log(req.session)
    // If there is an active session, and that session has a user property,
    // continue to the requested route.
    if (req.session.user) {
        console.log("Already logged in... Moving on")
        next()
    } else {
        console.log("redirecting to login page")
        res.redirect('/login')
    }
}

// This sets a CORS header.
// (1) Don't worry about this until we get to AJAX.
// (2) Don't ever to "*" in production!!!

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "localhost:3001");
    next();
});

// If a route comes in that doesn't match anything else,
// express will look for a file in the public directory.
app.use(express.static(__dirname + '/public'))

/* Display all toys */
app.get('/toys', isAuthenticated, (req, res) => {
    toyController.index(req, res);
});

/* Create a new toy */
app.post('/toys', isAuthenticated, (req, res) => {
    toyController.create(req, res);
});

/* Display a form to create a new toy */
app.get('/toys/new', isAuthenticated, (req, res) => {
    toyController.newToy(req, res);
});


/* Display details for one toy.  
   :id represents a "route parameter" */
app.get('/toys/:id', isAuthenticated, (req, res) => {
    toyController.show(req, res);
});

/* Edit a toy */
app.get('/toys/:id/edit', isAuthenticated, (req, res) => {
    toyController.edit(req, res);
});

// Don't worry about this until we get to security  and middleware.
const { body } = require('express-validator')
const validations = [
    body('toy.name').escape(),
    body('toy.description').escape(),
    body('toy.manufacturer').escape(),
    body('toy.price').escape()
]
// Add validations as 2nd parameter to apply

/* Update a toy */
app.post('/toys/:id', isAuthenticated, (req, res) => {
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

app.get('/login', (req, res) => {
    loginController.loginPage(req, res)
})

app.post('/login', (req, res) => {
    loginController.requestLogin(req, res)
})

app.get('/logout', (req, res) => {
    loginController.logout(req, res)
})

app.get('/init', (req, res) => {
    require('./SqliteToyDB').initialize();
    res.send("Initialized.");
});

app.get('/cookies', (req, res) => {
    res.cookie("MyCookie", "Hello there");
    res.cookie("Another Cookie", "I see you");

    // IMPORTANT!! Using req.get("Cookie") is _not_ the 
    // best way to view incoming cookies.
    // See https://expressjs.com/en/api.html#res.cookie
    // for how to use cookie-parser middleware
    // https://www.npmjs.com/package/cookie-parser
    console.log(req.get("Cookie"));
    res.send("Here are the cookies I see: " + req.get("Cookie"));
})

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
