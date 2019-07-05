const router = require('express').Router()
const {Collection, Links, Team, User} = require('../db/models')
module.exports = router

router.get('/:teamId', async (req, res, next) => {
  if (req.user) {
    console.log(req.params)
    try {
      const selectedCollection = await Collection.findAll({
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

// router.get('/', async (req, res, next) => {
//   if (req.user) {
//     try {
//       const allCollectionsFromAllTeams = await User.findAll({
//         where: {
//           id: +req.user.id
//         },
//         include: {
//           model: Team,
//           include: {
//             model: Collection,
//             include: Links
//           }
//         }
//       })
//       const filteredData = allCollectionsFromAllTeams[0].teams.map(team => {
//         return {
//           teamId: team.id,
//           teamName: team.name,
//           collections: team.collections
//         }
//       })
//       res.send(filteredData)
//     } catch (error) {
//       next(error)
//     }
//   } else {
//     res.sendStatus(403)
//   }
// })
