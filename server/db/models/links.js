const Sequelize = require('sequelize')
const db = require('../db')
const {Fraction} = require('../../utils')
const op = Sequelize.Op

const Links = db.define('links', {
  orderFloat: {type: Sequelize.DOUBLE},
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
  if (!Array.isArray(links)) throw new Error('Error adding order(not array)')
  if (!links.length) throw new Error('Error adding order(empty array)')
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
        firstFraction = firstFraction.getRightChild()
      }
      links.forEach(link => {
        link.orderFraction = firstFraction.toString()
        link.orderFloat = firstFraction.toFloat()
        firstFraction = firstFraction.getRightChild()
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
    let answer

    //if source is pre to target
    if (source.orderFloat > target.orderFloat) {
      const prev = await Links.findOne({
        where: {
          orderFloat: {[op.lt]: target.orderFloat},
          collectionId,
          id: {[op.ne]: target.id}
        },
        order: [['orderFloat', 'DESC']]
      })

      if (!prev) {
        newOrder = new Fraction(target.orderFraction).insertLeft()
      } else {
        newOrder = Fraction.insertBetween(
          prev.orderFraction,
          target.orderFraction
        )
      }
    } else {
      const nextAfterTarget = await Links.findOne({
        where: {
          orderFloat: {[op.gt]: target.orderFloat},
          collectionId,
          id: {[op.ne]: target.id}
        },
        order: [['orderFloat', 'ASC']]
      })

      if (!nextAfterTarget) {
        newOrder = new Fraction(target.orderFraction).getRightChild()
      } else {
        newOrder = Fraction.insertBetween(
          target.orderFraction,
          nextAfterTarget.orderFraction
        )
      }
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
