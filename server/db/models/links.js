const Sequelize = require('sequelize')
const db = require('../db')

const Links = db.define('links', {
  orderId: {type: Sequelize.INTEGER},
  description: {type: Sequelize.TEXT},
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  favicon: {type: Sequelize.STRING, allowNull: false}
})

module.exports = Links
