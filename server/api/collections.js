const router = require('express').Router()
const {Collection, Links, Team, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const allCollectionsFromAllTeams = await User.findAll({
        where: {
          id: +req.user.id
        },
        include: {model: Team, include: {model: Collection, include: Links}}
      })
      res.send(allCollectionsFromAllTeams)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('req user', req.user)
    const userId = req.user.id
    const {description, title, url, favicon, orderId} = req.body

    const userTeam = await Team.findOne({
      through: {where: userId}
    })
    console.log('userTeam', userTeam)

    const userCollection = await Collection.findOne({
      where: {teamId: +userTeam.id}
    })
    const link = {
      description,
      title,
      url,
      favicon,
      collectionId: userCollection.id,
      orderId
    }
    const newLink = await Links.create(link)
    res.send(newLink)
  } catch (error) {
    next(error)
  }
})
