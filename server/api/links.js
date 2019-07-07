const router = require('express').Router()
const {Links} = require('../db/models')
const {Fraction} = require('../utils')
const Sequelize = require('sequelize')
const op = Sequelize.Op

module.exports = router

router.delete('/', async (req, res, next) => {
  if (req.user) {
    const {id} = req.body
    try {
      const deletedLink = await Links.destroy({
        where: {id}
      })
      res.send('successful deletion')
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.put('/', async (req, res, next) => {
  if (req.user) {
    try {
      const {id, description, title, url} = req.body
      const [numOfAffectedRows, updatedItem] = await Links.update(
        {
          description,
          title,
          url
        },
        {
          where: {id},
          returning: true
        }
      )
      res.send(updatedItem)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.post('/', async (req, res, next) => {
  if (req.user) {
    try {
      let formattedLinkData = req.body.map(tab => {
        const {description, title, url, favicon, collectionId} = tab
        return {
          description,
          title,
          url,
          favicon,
          collectionId
        }
      })
      // formattedLinkData = formattedLinkData.map(el => {
      //   const newLink = {
      //     ...el,
      //     // orderFloat: firstFraction.toFloat(),
      //     // orderFraction: firstFraction.toString()
      //   }
      //   // firstFraction = firstFraction.insertLast()
      //   return newLink
      // })
      const serverLinkArr = await Links.bulkCreate(formattedLinkData)
      res.send(serverLinkArr)
    } catch (error) {
      next(error)
    }
  }
})

// route for changing order of links
// moves link with sourceID to the place of targetID
// operations:
// 1. Move to the very first place
//{
// 	"idSource":"8",
//   "idTarget":"",
//   "operation":"first",
//   "collectionId":"1"
// }
// 2. Move to the very last place
// {
// 	"idSource":"8",
//   "idTarget":"",
//   "operation":"last",
//   "collectionId":"1"
// }
// 3. Move source to the place of target
// {
// 	"idSource":"8",
//   "idTarget":"4",
//   "operation":"",
//   "collectionId":"1"
// }

// eslint-disable-next-line max-statements
router.put('/reorder', async function(req, res, next) {
  if (req.user) {
    try {
      console.log('try :', req.body)
      // let {idSource, idTarget, operation, collectionId} = req.body
      const idSource = +req.body.idSource
      const idTarget = +req.body.idTarget
      const collectionId = +req.body.collectionId
      const answer = await Links.changeOrder(idSource, idTarget, collectionId)
      res.send(answer)
      //   const source = await Links.findByPk(idSource)

      //   //insert to the beginning
      //   if (operation === 'first') {
      //     const first = await Links.findOne({
      //       where: {collectionId},
      //       limit: 1,
      //       order: [['orderFloat', 'ASC']]
      //     })
      //     const newOrder = new Fraction(first.orderFraction).insertFirst()
      //     const orderFloat = newOrder.toFloat()
      //     const orderFraction = newOrder.toString()
      //     answer = await source.update({orderFloat, orderFraction})
      //     // insert to end
      //   } else if (operation === 'last') {
      //     const last = await Links.findOne({
      //       where:{collectionId},
      //       limit: 1,
      //       order: [['orderFloat', 'DESC']]
      //     })
      //     const newOrder = new Fraction(last.orderFraction).insertLast()
      //     const orderFloat = newOrder.toFloat()
      //     const orderFraction = newOrder.toString()
      //     answer = await source.update({orderFloat, orderFraction})
      //     //insert to middle
      //   } else {
      //     const target = await Links.findByPk(idTarget)
      //     //if source is pre to target
      //     if (source.orderFloat > target.orderFloat) {
      //       const prev = await Links.findOne({
      //         where: {orderFloat: {[op.lt]: target.orderFloat}, collectionId},
      //         limit: 1,
      //         order: [['orderFloat', 'DESC']]
      //       })
      //       let newOrder
      //       let first
      //       if (!prev) {
      //         first = await Links.findOne({
      //           where: {collectionId},
      //           limit: 1,
      //           order: [['orderFloat', 'ASC']]
      //         })
      //         newOrder = new Fraction(first.orderFraction).insertFirst()
      //       } else {
      //         newOrder = Fraction.insertMiddleStatic(
      //           target.orderFraction,
      //           prev.orderFraction
      //         )
      //       }
      //       const orderFloat = newOrder.toFloat()
      //       const orderFraction = newOrder.toString()
      //       answer = await source.update({orderFloat, orderFraction})
      //       // if source is after target
      //     } else if (source.orderFloat < target.orderFloat ) {
      //       const nextAfterTarget = await Links.findOne({
      //         where: {orderFloat: {[op.gt]: target.orderFloat}},
      //         limit: 1,
      //         order: [['orderFloat', 'ASC']]
      //       })
      //       let newOrder
      //       let last
      //       if (!nextAfterTarget) {
      //         last = await Links.findOne({
      //           where: {collectionId},
      //           limit: 1,
      //           order: [['orderFloat', 'DESC']]
      //         })
      //         newOrder = new Fraction(last.orderFraction).insertLast()
      //       } else {
      //         newOrder = Fraction.insertMiddleStatic(
      //           target.orderFraction,
      //           nextAfterTarget.orderFraction
      //         )
      //       }
      //       const orderFloat = newOrder.toFloat()
      //       const orderFraction = newOrder.toString()
      //       answer = await source.update({orderFloat, orderFraction})
      //     // source === target, don't do anything
      //     } else {
      //       answer = {}
      //     }
      //   }
      //   res.send(answer)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})
