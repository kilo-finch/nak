'use strict'

const db = require('../server/db')
const {User, Links, Team, Collection} = require('../server/db/models')

async function seed() {
  await db.sync()
  await db.sync({force: true})
  // console.log('db synced!')

  // const users = await Promise.all([
  //   User.create(
  //     {email: 'cody@email.com', password: '123'},
  //     {include: [UserTeam]}
  //   ),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])
  // const oneOfEverything = await Promise.all([
  //   User.create(
  //     {email: 'cody@email.com', password: '123'},
  //     {include: [UserTeam]}
  //   ),
  //   Team.create({Id: 1}),
  //   Collection.create({teamId: 1}),
  //   Links.create({
  //     orderId: 1,
  //     description: 'blah',
  //     title: 'ok',
  //     favicon: 'www.google.com',
  //     collectionId: 1
  //   })
  // ])

  const createLinks = async () => {
    try {
      const user = await User.create({
        email: 'a@mail.ru',
        password: '1',
        firstName: 'Nikita',
        lastName: 'Bublik'
      })

      const collection = Collection.findByPk(1)

      let newLinks = []

      for (let i = 1; i < 10; i++) {
        newLinks.push({
          title: 'title' + i,
          favicon: 'www.google.com/favicon.ico',
          url: 'www.google.com',
          description: 'description' + i,
          collectionId: 1
        })
      }

      // await Links.create({
      //   title: 'title',
      //   favicon: 'www.google.com/favicon.ico',
      //   url: 'www.google.com',
      //   description: 'description',
      //   collectionId: 1
      // })

      // await Links.create({
      //   title: 'title',
      //   favicon: 'www.google.com/favicon.ico',
      //   url: 'www.google.com',
      //   description: 'description',
      //   collectionId: 1
      // })

      const links = await Links.bulkCreate(newLinks, {validate: true})
      // await links.setCollections(1)
    } catch (e) {
      console.error(e)
    }
    // const user = await User.create(
    //   {email: 'cody@email.com', password: '123'}
    //   // {include: [UserTeam]}
    // )
    // const user = await User.findByPk(1)
    // const team = await Team.findByPk(1)
    // const team = await Team.create({
    //   userPersonalCollection: true,
    //   name: 'My personal collection'
    // })

    // await team.setUsers(user)

    // const collection = await team.setCollections({
    //   userPersonalCollection: true,
    //   name: 'My collection'
    // })

    // const collection = await Collection.create({teamId: 1})

    // const links = await Links.create({
    //   description: 'blah',
    //   title: 'ok',
    //   favicon: 'www.google.com/favicon.ico',
    //   collectionId: 1,
    //   url: 'www.google.com'
    // })

    // team.setUsers(user)
  }
  // console.log(`seeded ${users.length} users`)
  createLinks()
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    // await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
