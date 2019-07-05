const router = require('express').Router()
const {Collection, Links, Team, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const allUserTeams = await Team.findAll({
        include: {
          model: User,
          where: {
            id: req.user.id
          }
        }
      })
      res.send(allUserTeams)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})
