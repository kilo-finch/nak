const User = require('./user')
const Team = require('./team')
const Collection = require('./collection')
const Links = require('./links')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Team, {through: 'UserTeam'})
Team.belongsToMany(User, {through: 'UserTeam'})
Team.hasMany(Collection)
Collection.belongsTo(Team)
Collection.hasMany(Links)
Links.belongsTo(Collection)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Team,
  Collection,
  Links
}
