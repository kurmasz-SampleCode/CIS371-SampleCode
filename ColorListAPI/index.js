const express = require('express')
const ColorDB = require('./ColorDB')

const app = express()
const port = 3001  // so we don't conflict with React on 3000

// Create a method that does nothing.
app.dont_use = f => f

// This sets a CORS header.  It allows requests from JS 
// that didn't originate here
// !!!!! Don't ever use "*" in production!!!
app.dont_use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});


app.get('/colors', async (req, res) => {
    res.json(await ColorDB.allColors())
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
