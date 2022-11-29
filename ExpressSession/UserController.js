let User = require('./User');

// The purpose of this "mini-controller" is to show how to use a dropdown select
// There is 
class UserController {

    select(req, res) {
        res.render('selectUser', { users: User.all() });
    }

    showSelected(req, res) {
        console.log("Input: ");
        console.log(req.body);

        let user = User.find(req.body.chosenUser);

        res.render('showUser', { user: user });

    }
}

module.exports = UserController;