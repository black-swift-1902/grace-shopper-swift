'use strict'
//
const db = require('../server/db')
const {Book, Order, User} = require('../server/db/models')
const sequelize = require('sequelize')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const books = await Promise.all([
    Book.create({
      title:
        'Cracking the Coding Interview: 189 Programming Questions and Solutions',
      imgUrl: 'https://tinyurl.com/yyudjeaq',
      price: 3200,
      description: `Cracking the Coding Interview, 6th Edition is here to help you through this process, teaching you what you need to know and enabling you to perform at your very best. I've coached and interviewed hundreds of software engineers. The result is this book.`
    }),
    Book.create({
      title: 'HTML, CSS, and JavaScript Mobile Development For Dummies',
      imgUrl: 'https://tinyurl.com/y5drwv5w',
      price: 2979,
      description:
        'HTML, CSS, and JavaScript Mobile Web Development For Dummies makes it easy to start developing great sites for mobile devices.'
    }),
    Book.create({
      title:
        'The Art of Computer Programming, Volume 1, Fascicle 1: MMIX -- A RISC Computer for the New Millennium',
      imgUrl: 'https://tinyurl.com/y5p4f88g',
      price: 2858,
      description:
        'The Art of Computer Programming (TAOCP) is a comprehensive monograph written by Donald Knuth that covers many kinds of programming algorithms and their analysis!'
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
