const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {Op} = require('sequelize');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Book
        }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const order = await Order.findByUserId(req.params.userId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: Number(req.params.orderId)
      },
      include: [
        {
          model: Book
        }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const books = await Book.findAll({
    where: {
      id: req.body
    }
  })
  try {
    await Order.create().then(async result => {
      await result.addBooks(books);
      res.status(201).send(result);
    })
  } catch (err) {
    next(err)
  }
})
