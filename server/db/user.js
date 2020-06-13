const Sequelize = require('sequelize')
const db = require('./database')
const crypto = require('crypto')

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    salt: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'default_user.png'
    },
    name: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.ENUM('female', 'male', 'unknown'),
        allowNull: false,
        defaultValue: 'unknown'
    },
    googleId: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
})

// *** INSTANCE METHODS
User.prototype.checkPassword = function (submittedPassword) {
    //return true of false if the password matched the one on file
    // this.hashPassword(submittedPassword, this.salt)
    return this.password === User.hashPassword(submittedPassword, this.salt)
}

// *** CLASS METHODS
User.generateSalt = function () {
    return crypto.randomBytes(32).toString('base64')
}

User.hashPassword = function (plainText, salt) {
    // accepts user's plaintext password & generated salt, returns the hash
    const hash = crypto.createHash('sha256')
    hash.update(plainText)
    hash.update(salt)
    return hash.digest('hex')
}

function setSaltAndPassword (user) {
    // employ salt & hash when user creates password for 1st time OR when then change it
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.hashPassword(user.password, user.salt)
    }
}

// User.beforeCreate(async (user, options) => {
//     const hashedPassword = await hashPassword(user.password)
//     user.password = hashedPassword
// })

module.exports = User
