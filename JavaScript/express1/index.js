
/* Import the express npm module */
const express = require('express')

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Tell the server to use EJS by default */
app.set('view engine',	'ejs');


/* Sample route returning a simple, static message. */
app.get('/', (req, res) => res.send('Hello World!'))


/* Sample route returning a simple, but dynamic response.
   The response takes a value from the query string
*/
app.get('/sayHi', (req, res) => {
    console.log(req);
    res.send(`Hello, ${req.query.name}`);
});


/* Sample route returning a rendered EJS view */
app.get('/testView', (req, res) => {
    res.render('firstView', {name: req.query.name});
    
});

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
