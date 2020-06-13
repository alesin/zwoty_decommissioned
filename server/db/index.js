// The purpose of this module is to bring your Sequelize instance (`db`) together with your models, for which you'll find some blank files in this directory.

const db = require('./database')
const User = require('./user')

// *** ASSOCIATIONS (one-one, one-many, many-many)

module.exports = {
    db,
    User,
}
