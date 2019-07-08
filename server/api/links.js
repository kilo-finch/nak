const router = require('express').Router()
const {Links} = require('../db/models')
// const {Fraction} = require('../utils')
// const Sequelize = require('sequelize')
// const op = Sequelize.Op

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
      const serverLinkArr = await Links.bulkCreate(formattedLinkData)
      res.send(serverLinkArr)
    } catch (error) {
      next(error)
    }
  }
})

// route for changing order of links
// moves link with sourceID to the place of targetID
//{
// 	"idSource":"8",
//   "idTarget":"4",
//   "collectionId":"1"
// }

// eslint-disable-next-line max-statements
router.put('/reorder', async function(req, res, next) {
  if (req.user) {
    try {
      // console.log('req.body :', req.body);
      // const idSource = +req.body.idSource
      // const idTarget = +req.body.idTarget
      // const collectionId = +req.body.collectionId
      // const answer = await Links.changeOrder(idSource, idTarget, collectionId)
      // res.send(answer)

      console.log('req.body :', req.body)
      for (let i = 0; i < req.body.length; i++) {
        const idSource = +req.body[i].idSource
        const idTarget = +req.body[i].idTarget
        const collectionId = +req.body[i].collectionId
        await Links.changeOrder(idSource, idTarget, collectionId)
      }

      res.send()
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})
