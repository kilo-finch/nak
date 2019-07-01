const router = require('express').Router()
const {Collection, Links, Team, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allCollectionsFromAllTeams = await User.findAll({
      where: {
        id: +req.user.id
      },
      include: {model: Team, include: {model: Collection, include: Links}}
    })
    // const allCollectionsFromAllTeams = await Team.findAll({
    //   include: {model: Collection, include: Links}
    // })
    // const user = await User.findByPk(1)
    // const userTeam = await user.getTeams(null, {
    //   include: [{model: Collection, include: {model: Links}}]
    // })
    // const userTeamCollections = await Promise.all(
    //   userTeam.map(async team => team.getCollections())
    // )
    // res.send(userTeamCollections)
    res.send(allCollectionsFromAllTeams)
  } catch (error) {
    next(error)
  }
})
