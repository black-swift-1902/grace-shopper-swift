'use strict'

const db = require('../server/db')
const {Book, Order, User} = require('../server/db/models')
const sequelize = require('sequelize')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const books = await Promise.all([
    Book.create({
      title: 'Cornell University',
      imageUrl: 'https://tinyurl.com/y3y5c9wj',
      price: 5.99,
      description: 'GREAT BOOK! READ IT!'
    }),
    Book.create({
      title: 'Johns Hopkins University',
      imageUrl: 'https://tinyurl.com/y3wrug7u',
      price: 20,
      description: 'GREAT BOOK! READ IT!'
    }),
    Book.create({
      title: 'Wellesley College',
      imageUrl: 'https://tinyurl.com/y6zlp5pd',
      price: 10.1,
      description: 'GREAT BOOK! READ IT!'
    })
  ])

  console.log(`seeded ${books.length} books`)

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  
  console.log(`seeded ${users.length} users`)

  const orders = await Promise.all([
    Order.create({date: sequelize.fn('NOW')}).then(async order => {
      await order.setUser(users[0])
      await order.addBooks([books[0], books[1]])
    }),
    Order.create({date: sequelize.fn('NOW')}).then(async order => {
      await order.setUser(users[1])
      await order.addBook(books[2])
    })
  ])

  console.log(`seeded ${orders.length} orders`)
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
    await db.close()
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
