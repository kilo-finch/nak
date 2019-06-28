const Sequelize = require('sequelize')
const db = require('../db')

const Collection = db.define('collection', {
  Name: {type: Sequelize.STRING},
  parentId: {type: Sequelize.INTEGER}
})

module.exports = Collection
