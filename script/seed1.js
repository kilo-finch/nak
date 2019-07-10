'use strict'

const db = require('../server/db')
const {User, Links, Collection} = require('../server/db/models')

async function seed() {
  // await db.sync()
  await db.sync({force: true})

  const createLinks = async () => {
    try {
      const user = await User.bulkCreate(
        [
          {
            email: 'a@mail.ru',
            password: '1',
            firstName: 'Nikita',
            lastName: 'Bublik'
          },
          {
            email: 'b@mail.ru',
            password: '1',
            firstName: 'Nikita',
            lastName: 'Bublik'
          },
          {
            email: 'c@mail.ru',
            password: '1',
            firstName: 'Nikita',
            lastName: 'Bublik'
          },
          {
            email: 'd@mail.ru',
            password: '1',
            firstName: 'Nikita',
            lastName: 'Bublik'
          }
        ],
        {individualHooks: true}
      )

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

      const links = await Links.bulkCreate(newLinks, {validate: true})
    } catch (e) {
      console.error(e)
    }
  }

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
