const router = require('express').Router()

//socket routes here
const {router: linksRouter, setIO: setLinksRouterIO} = require('./links')
const {
  router: collectionsRouter,
  setIO: setCollectionsRouterIO
} = require('./collections')

router.use('/users', require('./users'))
router.use('/collections', collectionsRouter)
router.use('/links', linksRouter)
router.use('/teams', require('./teams'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

//pass IO into the routers we set up
const setIO = io => {
  setLinksRouterIO(io)
  setCollectionsRouterIO(io)
}

module.exports = {router, setIO}
