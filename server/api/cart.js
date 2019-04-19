const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/', (req, res, next) => {
  try {
    res.send(req.session.cart.books)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    console.log('session: ', req.session.cart)
    req.session.cart.books.push(req.body)
    console.log('book', req.body)
    console.log('added!', req.session.cart)

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/:index', (req, res, next) => {
  try {
    const index = req.params.index
    console.log('bookIdx', index)
    req.session.cart.books.splice(index, 1)
    console.log('deleted', req.session.cart)
    res.status(204).send(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/', (req, res, next) => {
  try {
    req.session.cart.books = []
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
  }
})
