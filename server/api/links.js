const router = require('express').Router()
const {Collection, Links, Team, User} = require('../db/models')
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
      const userId = req.user.id

      const userTeam = await Team.findOne({
        through: {where: userId}
      })

      const userCollection = await Collection.findOne({
        where: {teamId: +userTeam.id}
      })

      const formattedLinkData = req.body.map(tab => {
        const {description, title, url, favicon, orderId} = tab
        return {
          description,
          title,
          url,
          favicon,
          collectionId: userCollection.id,
          orderId
        }
      })

      const serverLinkArr = await Links.bulkCreate(formattedLinkData)
      res.send(serverLinkArr)
    } catch (error) {
      next(error)
    }
  }
})
