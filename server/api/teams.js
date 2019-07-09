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
      // const user = await User.findByPk(req.user.id)
      // const allUserTeams1 = await user.getTeams(user.id)

      res.send(allUserTeams)
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
      const newTeam = await Team.create({name: req.body.name})
      await req.user.addTeam(newTeam)
      res.send(newTeam)
    } catch (error) {
      next(error)
    }
  }
})

router.put('/:teamId', async (req, res, next) => {
  if (req.user) {
    try {
      if (req.body.email) {
        const userToAdd = await User.findOne({where: {email: req.body.email}})
        const team = await Team.findByPk(+req.params.teamId)
        await userToAdd.addTeam(team)
        res.send(team)
      } else if (req.body.name) {
        const updatedTeam = await Team.update(
          {name: req.body.name},
          {where: {id: +req.params.teamId}, returning: true, plain: true}
        )
        res.send(updatedTeam[1])
      }
    } catch (error) {
      throw error
    }
  }
})

router.delete('/:teamId', async (req, res, next) => {
  if (req.user) {
    try {
      let destroyedTeam = await Team.destroy({where: {id: +req.params.teamId}})
      res.sendStatus(204).send(destroyedTeam)
    } catch (error) {
      throw error
    }
  }
})
