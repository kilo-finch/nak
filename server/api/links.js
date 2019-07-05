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

      const maxFloat = await Links.findOne({
        where: formattedLinkData[0],
        limit: 1,
        order: [['orderFloat', 'DESC']]
      })
      let firstFraction

      if (!maxFloat) {
        firstFraction = new Fraction()
      } else {
        firstFraction = new Fraction(maxFloat.orderFraction)
        firstFraction = firstFraction.insertLast()
      }

      formattedLinkData = formattedLinkData.map((el, i) => {
        const newLink = {
          ...el,
          orderFloat: firstFraction.toFloat(),
          orderFraction: firstFraction.toString()
        }
        firstFraction = firstFraction.insertLast()
        return newLink
      })
      const serverLinkArr = await Links.bulkCreate(formattedLinkData)
      res.send(serverLinkArr)
    } catch (error) {
      next(error)
    }
  }
})

// router.put('/reorder', async (req, res, next) => {
//   if (req.user) {
//     let answer
//     try {
//       const {idSource, idTarget, operation} = req.body
//       if (operation === 'first') {
//         const first = await Links.findOne({
//           where: {collectionId: +req.body.collectionId},
//           limit: 1,
//           order: [['orderFloat', 'ACS']]
//         })
//         const newOrder = new Fraction(first.orderFraction).insertFirst()
//         const orderFloat = newOrder.toFloat()
//         const orderFraction = newOrder.toString()
//         answer = await first.update({orderFloat, orderFraction})
//       } else if (operation === 'last') {
//         const last = await Links.findOne({
//           where: {collectionId: +req.body.collectionId},
//           limit: 1,
//           order: [['orderFloat', 'DESC']]
//         })
//         const newOrder = new Fraction(last.orderFraction).insertLast()
//         const orderFloat = newOrder.toFloat()
//         const orderFraction = newOrder.toString()
//         answer = await last.update({orderFloat, orderFraction})
//       } else {
//         idSource = +idSource
//         idTarget = +idTarget
//         const links = await Links.findAll({
//           where: {id: {[op.in]: [idSource, idTarget]}}
//         })
//         // links.map(el=>)
//       }

//       res.send(answer)
//     } catch (error) {
//       next(error)
//     }
//   } else {
//     res.sendStatus(403)
//   }
// })
