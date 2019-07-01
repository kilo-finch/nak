const Sequelize = require('sequelize')
const db = require('../db')

const Collection = db.define('collection', {
  name: {type: Sequelize.STRING},
  parentId: {type: Sequelize.INTEGER},
  userPersonalCollection: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Collection
