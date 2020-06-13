const router = require('express').Router()

// *** GET requests to /api/users/
router.get('/', function (req, res, next) { /* etc */})

// *** POST requests to /api/users/
router.post('/', function (req, res, next) { /* etc */})

// *** PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next) { /* etc */})

// *** DELETE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next) { /* etc */})

module.exports = router
