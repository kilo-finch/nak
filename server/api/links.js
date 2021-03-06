const router = require('express').Router()
const {Links, Collection} = require('../db/models')
const {Fraction} = require('../utils')
const Sequelize = require('sequelize')
const op = Sequelize.Op

var io
let socket
const setIO = (IO, SOCKET) => {
  io = IO
  socket = SOCKET
}

module.exports = {router, setIO}

router.delete('/:linkId', async (req, res, next) => {
  if (req.user) {
    const id = +req.params.linkId
    try {
      const link = await Links.findByPk(id)
      const collection = await Collection.findByPk(link.collectionId)
      const deletedLink = await Links.destroy({
        where: {id}
      })
      //ADD SOCKET HERE
      io.to(collection.teamId).emit('get_team', collection.teamId)
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
      //socket here
      const collectionId = updatedItem.collectionId
      const collection = await Collection.findByPk(collectionId)
      io.to(collection.teamId).emit('get_team', collection.teamId)
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
      const collection = await Collection.findByPk(
        +formattedLinkData[0].collectionId
      )
      //make a join for all users in the team
      const teamId = collection.teamId
      io.in(teamId).emit('get_team', teamId)
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
      //set socket route here
      const collection = await Collection.findByPk(+req.body.collectionId)
      // const sourceId = idSource
      // const targetId = idTarget
      // const updateOrder = {sourceId, targetId, collectionId}
      // await io.to(collection.teamId).emit('move_links', updateOrder)
      // io.to(collection.teamId).emit('refresh_collection', collectionId)
      io.to(collection.teamId).emit('get_team', collection.teamId)
      res.send(answer)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})
