const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const Customer = mongoose.model('customers');

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => [
    Customer.findById(id).then(user => {
        done(null, user)
    })
])

passport.use(new GoogleStrategy({
    clientID : keys.googleClientId,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/return'
},async  (accessToken, refreshToken, profile, done) => {
    console.log('******************************')
    let existingUser = await Customer.findOne({googleId : profile.id})
    if (existingUser) return done(null, existingUser)
    let newUser = await new Customer({googleId : profile.id}).save()
    done(null, newUser)
}))