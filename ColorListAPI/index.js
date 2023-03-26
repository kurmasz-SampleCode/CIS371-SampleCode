const { query } = require('express')
const express = require('express')
const ColorDB = require('./ColorDB')

const app = express()
const port = 3001  // so we don't conflict with React on 3000


const myArgs = process.argv.slice(2)
if (myArgs[0] === '--test') {
    ColorDB.reset()
}


// Tell Express to parse the body as JSON.
// (This is a different format than data sent by an HTML form.)
app.use(express.json());

// This sets a CORS header.  It allows requests from JS 
// that didn't originate here
// !!!!! Don't ever use "*" in production!!!
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    next();
});

// Respond to preflight
//
// (This code isn't necessary. The "use" block above 
// actually produces all the necessary CORS responses.
// I include this block here simply to demonstrate 
// the preflight.
app.options('/colors', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

if (myArgs[0] === '--test') {
    app.get('/reset', (req, res) => {
        ColorDB.reset();
        res.send('reset')
    })
}

app.get('/colors', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await ColorDB.allColors()), delay)
})

app.post('/colors', async (req, res) => {
    console.log("About to create a new color");

    // With JSON data, req.body is the entire parsed JSON object
    console.log(req.body);
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        ColorDB.insertColor(req.body).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/colors/:id', async (req, res) => {
    
    let uniqId = req.params.id;
    console.log("About to modify color with primary key " + uniqId);
    console.log(req.body)

    // Using != instead of !== here because :id matches as a string, 
    // while the body (parsed from JSON) will be a Number.
    if (uniqId != req.body.pk) {
        res.status(500)
        res.send({message: "Problem with request format:  Primary key is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        ColorDB.updateColor(req.body).then((data) => {
            res.json(data);
        })
    }
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
