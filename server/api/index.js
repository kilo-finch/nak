const router = require('express').Router()

//socket routes here
const {router: linksRouter, setIO: setLinksRouterIO} = require('./links')
const {
  router: collectionsRouter,
  setIO: setCollectionsRouterIO
} = require('./collections')
const {router: teamsRouter, setIO: setTeamsRouterIO} = require('./teams')

router.use('/users', require('./users'))
router.use('/collections', collectionsRouter)
router.use('/links', linksRouter)
router.use('/teams', teamsRouter)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

//pass IO and 1 socket into the routers we set up
const setIO = (io, socket) => {
  setLinksRouterIO(io, socket)
  setCollectionsRouterIO(io, socket)
  setTeamsRouterIO(io, socket)
}

module.exports = {router, setIO}
