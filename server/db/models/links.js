const Sequelize = require('sequelize')
const db = require('../db')
const {Fraction} = require('../../utils')
const op = Sequelize.Op

const Links = db.define('links', {
  orderFloat: {type: Sequelize.FLOAT},
  orderFraction: {type: Sequelize.STRING},
  description: {type: Sequelize.TEXT},
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  favicon: {type: Sequelize.TEXT, defaultValue: '../../../public/favicon.ico'}
})

// links = Array of link objects
const addOrder = async links => {
  if (!Array.isArray(links)) throw 'Error adding order(not array)'
  if (!links.length) throw 'Error ading order(empty array)'
  try {
    if (!links[0].orderFraction) {
      const maxFloat = await Links.findOne({
        where: {collectionId: links[0].collectionId},
        limit: 1,
        order: [['orderFloat', 'DESC']]
      })
      let firstFraction
      if (!maxFloat) {
        firstFraction = new Fraction()
      } else {
        firstFraction = new Fraction(maxFloat.orderFraction)
        firstFraction = firstFraction.insertRight()
      }
      links.forEach(link => {
        link.orderFraction = firstFraction.toString()
        link.orderFloat = firstFraction.toFloat()
        firstFraction = firstFraction.insertRight()
      })
    }
  } catch (e) {
    console.error(e)
  }
}

Links.beforeValidate(link => addOrder([link]))
Links.beforeBulkCreate(addOrder)

// eslint-disable-next-line complexity
Links.changeOrder = async (idSource, idTarget, collectionId) => {
  if (idSource === idTarget) return
  if (!idSource || !idTarget || !collectionId) return
  try {
    const source = await Links.findByPk(idSource)
    const target = await Links.findByPk(idTarget)
    let newOrder
    //if source is pre to target
    if (source.orderFloat > target.orderFloat) {
      const prev = await Links.findOne({
        where: {orderFloat: {[op.lt]: target.orderFloat}, collectionId},
        limit: 1,
        order: [['orderFloat', 'DESC']]
      })
      if (!prev) {
        // first = await Links.findOne({
        //   where: {collectionId},
        //   limit: 1,
        //   order: [['orderFloat', 'ASC']]
        // })
        newOrder = new Fraction(target.orderFraction).insertLeft()
      } else {
        // newOrder = Fraction.insertMiddleStatic(
        //   target.orderFraction,
        //   prev.orderFraction
        // )
        newOrder = new Fraction(prev.orderFraction).insertRight()
      }
      // const orderFloat = newOrder.toFloat()
      // const orderFraction = newOrder.toString()
      // answer = await source.update({orderFloat, orderFraction})
      // if source is after target
    } else {
      const nextAfterTarget = await Links.findOne({
        where: {orderFloat: {[op.gt]: target.orderFloat, collectionId}},
        limit: 1,
        order: [['orderFloat', 'ASC']]
      })
      // let newOrder
      if (!nextAfterTarget) {
        // last = await Links.findOne({
        //   where: {collectionId},
        //   limit: 1,
        //   order: [['orderFloat', 'DESC']]
        // })
        newOrder = new Fraction(target.orderFraction).insertRight()
      } else {
        // newOrder = Fraction.insertMiddleStatic(
        //   target.orderFraction,
        //   nextAfterTarget.orderFraction
        // )
        newOrder = new Fraction(nextAfterTarget.orderFraction).insertLeft()
      }
      // const orderFloat = newOrder.toFloat()
      // const orderFraction = newOrder.toString()
      // answer = await source.update({orderFloat, orderFraction})
    }
    const orderFloat = newOrder.toFloat()
    const orderFraction = newOrder.toString()
    answer = await source.update({orderFloat, orderFraction})
    return answer
  } catch (e) {
    console.error(e)
  }
}

module.exports = Links
