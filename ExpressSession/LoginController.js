class LoginController {

    loginPage(req, res) {
        res.render('login', { message: 'Please login' })
    }

    requestLogin(req, res, next) {

        console.log("Request body")
        console.log(req.body)
        const reversedUser = req.body.username.split("").reverse().join("")
        if (req.body.passwd !== reversedUser) {
            res.render("login", { message: 'Incorrect password' })
        } else {
            console.log("Creating new session")
            req.session.regenerate((err) => {
                if (err) next(err)
                req.session.user = req.body.username
                console.log('here!')
                res.redirect('/toys')
            })
        }
    }
    
    logout(req, res) {
        req.session.destroy(function(){
            res.redirect('/login');
          });
    }
}

module.exports = LoginController