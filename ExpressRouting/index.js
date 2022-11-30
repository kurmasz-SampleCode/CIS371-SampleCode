/*************************************************************
 * 
 * Demonstrate basic routing and middleware in Express
 * 
 * 
 * (c) 2022 Zachary Kurmas
 **************************************************************/

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('The root route.')
})


// Change this to the current day to get routes to work!
const dayOpen = 'Wednesday'
const businessHours = require('./openForBusiness')
/*
app.use(businessHours(dayOpen, (req, res) => {
    res.send(`Go away! We are only open on ${dayOpen}.`)
}))
*/
// (Notice that this businessHours middleware only applies to routes below.
//  It does not apply to the root route above.)

//
// Books routes
//
// Typical route matching

app.get('/books', (req, res) => {
    res.send('Displaying the "/books" route.')
})

app.get('/books/73', (req, res) => {
    res.send('Displaying special route for book #73.')
})

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id
    res.send(`Displaying the route for book number "${bookId}".`)
})

// You can use more than one placeholder
app.get('/books/:id/chapter/:chapter', (req, res) => {
    res.send(`Displaying the route for book number ${req.params.id}, chapter ${req.params.chapter}`)
})

//
// Toys routes
//
// Example of a "broken" route order:
//
// Notice that the first matching route is used, so the special route for toy 119 will never get used.
// "/toys/119" will match the route below before "/toys/119" is examined.

app.get('/toys/:id', (req, res) => {
    const toyId = req.params.id
    const message = toyId === '119' ? '(Notice that this is _not_ the special route for book 119.)' : ''

    res.send(`Displaying the route for toy number ${toyId}. ${message}`)
})

app.get('/toys', (req, res) => {
    res.send('Displaying the "/toys" route.')
})

app.get('/toys/119', (req, res) => {
    res.send('Displaying special route for toy #119.')
})


//
// Authors routes
//
// Example use of the "next" parameter to move to the next _matching_ route
//
// IMPORTANT: next() is used by middleware.  *Don't* use the technique below
// To provide conditional handling based on parameters.  (I just did that 
// below because it was an easy way to demonstrate how next() behaves.)

app.get('/authors/:id', (req, res, next) => {

    if (parseInt(req.params.id) > 100) {
        console.log('Calling "next"')
        // Notice that this invokes the next _matching_ route (/authors/:id).  
        // It does _not_ invoke /authors
        next()
    } else {
        res.send(`Displaying the "authors/:id" route for ids < 100 (${req.params.id})`)
    }
})

app.get('/authors', (req, res) => {
    res.send('Displaying the "/authors" route (no id).')
})

app.get('/authors/:id', (req, res) => {
    res.send(`Displaying the _second_ "authors/:id" route (the one for ids _over_ 100). Id is ${req.params.id}`)
})

//
// Cars routes
//
// Example use of the "next" parameter to move to the next handler in the list
//
// The http methods (get(), post(), etc.) can take a sequence of handlers as parameters.
// This sequence can be several parameters, or an array of handlers.
// When multiple handlers are present, next() invokes the next handler in the list; or, 
// when called from the last handler in the list, moves onto the next matching route.
//

app.get('/cars/:id',
    (req, res, next) => {
        const id = parseInt(req.params.id)
        if (id < 100) {
            res.send(`Displaying the "cars/:id" route for ids < 100 (${req.params.id})`)
        } else {
            // Move to the handler below (the next parameter to this call to app.get)
            next()
        }
    },
    (req, res, next) => {
        const id = parseInt(req.params.id)
        if (id < 200) {
            res.send(`Displaying the _second_ "cars/:id" handler (the one for ids between 100 and 200). Id is ${req.params.id}`)
        } else {
            next()
        }
    },
    (req, res, next) => {
        const id = parseInt(req.params.id)
        if (id < 300) {
            res.send(`Displaying the _third_ "cars/:id" handler (the one for ids between 200 and 300). Id is ${req.params.id}`)
        } else {
            // since this is the last handler given to this call to app.get, jump down to the 
            // next *matching* route.
            next()
        }
    })

app.get('/cars', (req, res) => {
    res.send('Displaying the generic "/cars" route.')
})

// No, you wouldn't normally handle different groups of id values this way.  I'm just
// demonstrating how next() works.
app.get('/cars/:id', (req, res) => {
    res.send(`Displaying the "backup" "cars/:id" route (the one for ids over 300). Id is ${req.params.id}`)
})

//
// Student routes
//
// Demonstrates the behavior of next('route')
// Demonstrates passing data between handlers
//
app.get('/students/:id',
    (req, res, next) => {
        const id = parseInt(req.params.id)
        if (id % 5 == 0) {
            req.reason = 'a multiple of 5'
            // Skip all other handlers and go to the next matching route.
            next('route')
        } else if (id < 500) {
            res.send(`Displaying the "students/:id" route for ids < 500 (${req.params.id})`)
        } else {
            // Move to the handler below (the next parameter to this call to app.get)
            next()
        }
    },
    (req, res, next) => {
        const id = parseInt(req.params.id)
        if (id % 7 == 0) {
            req.reason = 'a multiple of 7 and >= 500'
            next('route')
        } else if (id < 1000) {
            res.send(`Displaying the _second_ "students/:id" route (the one for ids between 500 and 1000). Id is ${req.params.id}`)
        } else {
            next()
        }
    },
    (req, res) => {
        res.send(`Displaying the _third_ "cars/:id" route (the one for ids >1000). Id is ${req.params.id}`)
    })

app.get('/students/:id', (req, res) => {
    res.send(`This is the "special" students route because the id was ${req.reason}.  (${req.params.id})`)
})


//
// Middleware
//
// You can define handlers as separate functions and pass them to multiple routes
//

const numberOnly = (req, res, next) => {
    const idString = req.params.id                    
    if (idString.match(/^\d+$/)) {
        next()
    } else {
        res.send(`Ids can only be positive integers. "${req.params.id}" doesn't work.`)
    }    
}

const evensOnly = (req, res, next) => {
    const id = parseInt(req.params.id)
    if (id % 2 == 1) {
        res.send('We don\'t like odd ids!')
    } else {
        next()
    }
}

app.get('/dogs/:id', numberOnly, (req, res)  => {
    res.send(`This is the dogs route for id ${req.params.id}.`)
})

app.get('/colors/:id', numberOnly, evensOnly, (req, res)  => {
    res.send(`This is the colors route for id ${req.params.id}.`)
})

//
// Default route (if nothing else matches)
//
// IMPORTANT: Make sure this comes last!!!
//

app.get('*', (req, res) => {
    res.send(`Route "${req.originalUrl}" not recognized.`)
})

//
// Launch the server
//
app.listen(port, () => console.log(`Example app listening on port ${port}!`))