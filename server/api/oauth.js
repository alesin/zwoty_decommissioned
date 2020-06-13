const router = require('express').Router()
const passport = require('passport')
const {User} = require('../db')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = router

// *** USER PETITION for Google authentication & login (GET /auth/google)
// router.get('/', passport.authenticate('google', {scope: 'email'}))
// ^ SET the SCOPE: https://developers.google.com/identity/protocols/oauth2/openid-connect#scope-param
// https://developers.google.com/identity/protocols/oauth2/scopes#google-sign-in
router.get('/', passport.authenticate('google', {scope: 'openid profile email'}))

// *** CALLBACK for user, redirected from Google (GET /auth/google/callback)
// authenticated user returns with temporary token (token must be presented to Google alongside client secret ==> if token is good, get user profile & permanent(ish) access token)
router.get('/verify', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
}))

// *** Google credentials
const googleCreds = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}

// *** Google will send back the token & profile
// the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
const verificationCallback = async (token, refreshToken, profile, done) => {
    console.log('---', 'PROFILE in verification callback', profile, '---')

    const userInfo = {
        email: profile.emails[0].value,
        imageUrl: profile.photos ? profile.photos[0].value : undefined,
        name: profile.displayName
    }

    try {
        // *** findOrCreate method returns array, thus destructuring...
        const [user] = await User.findOrCreate({
            where: {googleId: profile.id},
            defaults: userInfo
        })
        
        done(null, user)  // *** user is piped through passport.serializeUser
    } catch (error) {
        done(error)
    }
} 

// *** configuring the STRATEGY  (credentials + verification callback)
// this is used by 'passport.authenticate'
const strategy = new GoogleStrategy(googleCreds, verificationCallback)
passport.use(strategy)
