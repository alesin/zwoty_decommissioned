const router = require('express').Router()

// *** ROUTES
router.use('/users', require('./users'))
// *** authentication router
router.use('/auth', require('./auth'))

// *** ERROR handling ==> no such route!
router.use((req, res, next) => {
    const error = new Error('API route not found!')
    error.status = 404
    next(error)
})

module.exports = router