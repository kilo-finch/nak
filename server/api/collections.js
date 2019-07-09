const router = require('express').Router()
const {Collection, Links, Team, User} = require('../db/models')

let io
let socket
const setIO = (IO, SOCKET) => {
  io = IO
  socket = SOCKET
}

module.exports = {router, setIO}

router.post('/:teamId', async (req, res, next) => {
  if (req.user) {
    try {
      const {name} = req.body
      const teamId = +req.params.teamId
      const newCollection = await Collection.create({name, teamId})
      //added socket here
      io.to(teamId).emit('get_team', teamId)
      res.status(201).send(newCollection)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const allCollectionsFromAllTeams = await User.findAll({
        where: {
          id: +req.user.id
        },
        include: {
          model: Team,
          include: {
            model: Collection,
            include: Links
          }
        }
      })
      const filteredData = allCollectionsFromAllTeams[0].teams.map(team => {
        return {
          teamId: team.id,
          teamName: team.name,
          collections: team.collections
        }
      })
      res.send(filteredData)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.get('/:teamId', async (req, res, next) => {
  if (req.user) {
    try {
      const selectedCollection = await Collection.findAll({
        include: {
          model: Links
        },
        where: {
          teamId: req.params.teamId
        }
      })
      res.send(selectedCollection)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.put('/:collectionId', async (req, res, next) => {
  if (req.user) {
    try {
      const [
        numberOfUpdatedCollections,
        updatedCollection
      ] = await Collection.update(
        {
          name: req.body.collectionName
        },
        {
          where: {
            id: +req.params.collectionId
          },
          returning: true
        }
      )

      //socket here
      const teamId = updatedCollection.teamId
      io.to(teamId).emit('get_team', teamId)
      res.send(updatedCollection)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

router.delete('/:collectionId', async (req, res, next) => {
  if (req.user) {
    try {
      const teamId = await Collection.findByPk(+req.params.collectionId)
      const deletedCollection = await Collection.destroy({
        where: {
          id: +req.params.collectionId
        }
      })

      //socket here
      io.to(teamId).emit('get_team', teamId)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})
