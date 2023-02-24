// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm module */
const express = require('express')

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser')

/* Instantiate a server object*/
const app = express()
const port = 3000

/* Import and use cookie-parser
 *
 * cookie-parser is middleware that reads the cookie response header,
 * parses it, then puts the key-value pairs in req.cookie 
 */
let cookieParser = require('cookie-parser')
app.use(cookieParser())


/* Serve static files from the images directory */
app.use(express.static('images'))

/* Tell the server to use EJS by default */
app.set('view engine', 'ejs')


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/listCookies', (req, res) => {

    let rawCookies = req.rawHeaders[req.rawHeaders.indexOf('Cookie')+1]
    console.log(`The "raw" cookies: ${rawCookies}`)
    console.log()

    console.log('The "baked" cookies: ')
    console.log(req.cookies)

    res.render('cookieList', {cookieList: req.cookies})
})


app.get('/clearCookies', (req, res) => {
    Object.keys(req.cookies).forEach((key) => {
        res.cookie(key, `deleted cookie ${key}`, {maxAge: 0})
    })
    res.send('All cookies cleared')
})

/* Set cookies based on values in the query string. */
app.get('/setCookies', (req, res) => {
    console.log(req.query)
    Object.keys(req.query).forEach((key) => {
        res.cookie(key, req.query[key])
    })
    res.send('New cookies set')
})


app.get('/cookieDemo', (req, res) => {
    
    if (req.cookies.name === undefined) {
        const nameList = ['spots', 'lefty', 'mac', 'Neon', 'bub']
        const randName = nameList[Math.floor(Math.random() * nameList.length)]
        const randInt = Math.floor(Math.random() * 100)
        const newName  = `${randName}${randInt}`
    
        // res.cookie('name', newName)
        // equivalent to 
        //res.append('Set-Cookie', `name=${newName}`)
        res.cookie('name', newName, {maxAge: 15000})  // maxAge is in milliseconds
        
        
        res.cookie('visit', 1)
        res.render('firstVisit', {nickname: newName})
    } else {
        const name = req.cookies.name
        const visitNum = parseInt(req.cookies.visit) + 1

        res.cookie('visit', visitNum)
        res.render('repeatVisit', {name, visitNum})
    }


})





app.get('/', (req, res) => res.send('This is the express cookie demo.'))

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))