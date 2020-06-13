const express = require('express')
const app = express()
const path = require('path')
const {db, User} = require('./db')
const morgan = require('morgan')  // *** LOGGING middleware
const session = require('express-session')  // *** SESSION middleware
const passport = require('passport')

app.use(morgan('dev'))   // *** LOGGING middleware
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))  // *** Customize MORGAN logging

// *** BODY PARSING middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// *** SESSION middleware
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({db: db})

dbStore.sync() // *** sync to create session table

app.use(session({
    secret: process.env.SESSION_SECRET || 'A wildly insecure secret...',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))

// *** PASSPORT middleware (piggyback on SESSION middleware)
app.use(passport.initialize())
app.use(passport.session())

// *** After FIND / CREATE user, we 'serialize' our user on the session
passport.serializeUser((user, done) => {
    try {
        done(null, user.id)
    } catch (error) {
        done(error)
    }
})

// *** Since we have 'serialized' user on session (with an id), use the id to find user and attach the user Obj to req.user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

// *** STATIC middleware
app.use(express.static(path.join(__dirname, '../public')))

// *** connect ROUTES ==> mounted on /api
app.use('/api', require('./api'))

// *** serve up index.HTML for all requests that do not match API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// *** ERROR HANDLING middleware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
