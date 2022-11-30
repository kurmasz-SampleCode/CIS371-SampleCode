const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


// eslint-disable-next-line no-undef
module.exports = (dayOpen, whenClosed) => {
    const dayOpenNum = weekday.indexOf(dayOpen)
    return (req, res, next) => {
        const date = new Date()
        if (dayOpenNum !== date.getDay()) {
            whenClosed(req, res)
        } else {
            next()
        }
    }
}