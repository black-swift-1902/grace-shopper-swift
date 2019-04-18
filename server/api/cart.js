const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {Op} = require('sequelize');
module.exports = router

router.get('/', (req, res, next) => {
  try {
    res.send(req.session.cart.books);
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    req.session.cart.books.push(req.body);
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/clear', (req, res, next) => {
    try {
        req.session.cart.books = [];
        res.sendStatus(204);
      } catch (err) {
      next(err)
    }
  })

router.delete('/:bookId', (req, res, next) => {
    try {
        const bookIdx = req.session.cart.books.findIndex(book => book.id === Number(req.params.bookId));
        req.session.cart.books.splice(bookIdx,1);
        res.status(204).send(req.session.cart);
      } catch (err) {
      next(err)
    }
  })
  