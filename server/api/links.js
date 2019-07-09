const router = require('express').Router()
const {Links} = require('../db/models')

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
        const {description = null, title, url, favicon, collectionId} = tab
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
      const idSource = +req.body.idSource
      const idTarget = +req.body.idTarget
      const collectionId = +req.body.collectionId
      const answer = await Links.changeOrder(idSource, idTarget, collectionId)
      res.send(answer)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})
