module.exports = (route) => {
    return (req, res, next) => {
        const idString = req.params.id
        console.log(req.params)
        console.log(idString)
        if (idString.match(/^\d+$/)) {
            next()
        } else {
            res.redirect(route)
        }    
    }
}



