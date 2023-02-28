class LoginController {

    // Simply render the page with the login form.
    loginPage(req, res) {
        res.render('login', { message: 'Please login' })
    }

    // Respond to the POST from the login page.
    requestLogin(req, res, next) {
        console.log('Request body')
        console.log(req.body)
       
        let returnTo = req.session.returnTo

        // For simplicity the password is always just the reverse of the 
        // login name.  In a real application, we would make a DB 
        // access to check the username and password.
        const reversedUser = req.body.username.split('').reverse().join('')
        if (req.body.passwd !== reversedUser) {
            // If the password is incorrect, re-render the login form.
            res.render('login', { message: 'Incorrect password' })
        } else {
            console.log('Creating new session')
            req.session.regenerate((err) => {
                if (err) next(err)
                req.session.user = req.body.username
                console.log('Session created')
                console.log(req.session)
                res.redirect(returnTo ?? '/toys')
            })
        }
    }
    
    logout(req, res) {
        req.session.destroy(function(){
            res.redirect('/login')
        })
    }
}

module.exports = LoginController