const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Team = require('./team')
const Collection = require('./collection')

const User = db.define('user', {
  googleId: {
    type: Sequelize.STRING
  },
  firstName: {type: Sequelize.STRING},
  lastName: {type: Sequelize.STRING},
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageURL: {type: Sequelize.STRING},
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },

  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

const createTeamAndCollection = async (user, options) => {
  try {
    const transaction = options.transaction
    const team = await Team.create({
      name: `${user.firstName}'s Personal Collections`,
      userPersonalCollection: true
    })
    await team.setUsers(user, {transaction})
    const collection = await Collection.create({
      name: 'Default Collection',
      userPersonalCollection: true
    })
    await team.setCollections(collection)
  } catch (e) {
    console.error(e)
  }
}

User.afterCreate(createTeamAndCollection)
