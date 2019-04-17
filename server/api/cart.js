const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {Op} = require('sequelize');
module.exports = router


router.put('/addToCart', async (req, res, next) => {
  try {
    req.session.cart.books.push(req.body);
    console.log('added!', req.session.cart)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/removeFromCart/:bookId', async (req, res, next) => {
    try {
        req.session.cart.books = req.session.cart.books.filter(book => {
            book.id !== req.params.bookId
        })
        console.log('delete!', req.session.cart)
        res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  })
  