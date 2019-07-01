const Sequelize = require('sequelize')
const db = require('../db')

const Team = db.define('team', {
  name: {type: Sequelize.STRING},
  userPersonalCollection: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Team
