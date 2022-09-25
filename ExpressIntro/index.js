// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));



/* Sample route returning a simple, static message. */
app.get('/', (req, res) => res.send('Hello World!'))


/* Sample route returning a simple, but dynamic response.
   The response takes a value from the query string
*/
app.get('/sayHi', (req, res) => {
    // console.log(req);
    res.send(`Hello, ${req.query.name}`);
});


/* Sample route returning a rendered EJS view */
app.get('/testView', (req, res) => {
    // By default, Express looks for views in the `views` directory.
    res.render('firstView', { name: req.query.name });

});

/* Sample route returning a static HTML file. */
app.get('/staticHTML', (req, res) => {
    // When using sendFile, you either need to 
    // (1) Provide an absolute path name, or 
    // (2) Provide a "root" parameter.  
    // __dirname provide the absolute path of the currently executing file.
    res.sendFile('hello.html', { root: __dirname });
});

app.get('/multTable', (req, res) => {
    res.sendFile('multForm.html', { root: __dirname });
});

app.post('/showTable', (req, res) => {
    res.render('multTable', req.body);
});



/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))