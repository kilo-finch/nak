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
