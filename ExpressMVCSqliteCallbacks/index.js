/*
 * Demonstrates DB access with callbacks (as opposed to promises)
 */


const express = require('express')
let ToyDB = require('./SqliteToyDB');


/* 
  Since this example only implements two routes, 
  I'll just put the controller here.
  (Do as I say, not as I do :) 
*/
class ToyController {

    // Because DB accesses are asynchronous, any access requires
    // a callback.
    index(req, res) {
        ToyDB.allToys((rows) => {
            res.render('toyIndex', { toys: rows });
        });
    }

    show(req, res) {
        ToyDB.find(req.params.id, (toy) => {
            if (toy) {
                res.render('toyShow', { toy: toy });
            } else {
                res.send(`Toy with id ${req.params.id} not found`);
            }
        });
    }
}
let toyController = new ToyController();


/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));



/* Display all toys */
app.get('/toys', (req, res) => {
    toyController.index(req, res);
});

app.get('/toys/:id/edit', (req, res) => {
    res.send("This feature not implemented for this demo.");
})

app.get('/toys/new', (req, res) => {
    res.send("This feature not implemented for this demo.");
})

app.get('/toys/:id', (req, res) => {
    toyController.show(req, res);
});


/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))