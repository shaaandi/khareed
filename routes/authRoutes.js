const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope : ['profile', 'email']
    }))

    app.get('/auth/google/return', passport.authenticate('google'), (req,res) => {
        res.send("You are logged in");
    })
}