// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')
const cors = require('cors');


const AuthorController = require('./AuthorController');
const authorController = new AuthorController();

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3001

/* Parse the request body if there is POST data */
/* IMPORTANT! Notice that this is different from the expressMVC example:
   It uses json instead of urlEncoded */
app.use(bodyParser.json());

/* Use CORS.  Enable for All requests */
app.use(cors());


let makeCrudRoutes = (name, controller) => {

    // create a "route" object.
    let makeRoute = (verb, path, method) => ({ verb: verb, path: path, method: method });

    // describe the desired routes
    let routes = [
        makeRoute('get', `/${name}`, 'index'),
        makeRoute('post', `/${name}`, 'create'),
        makeRoute('get', `/${name}/:id`, 'show'),
        makeRoute('put', `/${name}/:id`, 'update'),
        makeRoute('delete', `/${name}/:id`, 'delete')
    ];

    // create the routes from the description.
    routes.forEach((route) => {
        app[route.verb](route.path, (req, res) => {
            let ret = controller[route.method](req, res);

            Promise.resolve(ret).catch((data) => {
                console.log("Unhandled Exception");
                console.log(data);
                res.status(500);
                res.send("Server Error: Unhandled Exception.");
            });
        });
    });
};

makeCrudRoutes('authors', authorController);

app.get('/initTest', (req, res) => {
    const AuthorDB = require('./AuthorDB');
    AuthorDB.initializeTest();
    res.status(204);
    res.send();
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))