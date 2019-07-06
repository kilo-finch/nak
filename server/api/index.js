const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/collections', require('./collections'))
router.use('/links', require('./links'))
router.use('/teams', require('./teams'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
