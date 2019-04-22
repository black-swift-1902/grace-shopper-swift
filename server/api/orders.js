const router = require('express').Router()
const { Order, Book, Order_log } = require('../db/models')
const { Op } = require('sequelize');
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
  try {
    if (!req.session.userId) {
      await Order.create({ submitted: true })
        .then(order => {
          req.session.cart.forEach(async book => 
            await order.addBook(book.id, { through: { quantity: book.order_log.quantity }}));
        })
    }
    else {
      Order.update(
        { submitted: true },
        {
          where: {
            userId: req.session.userId,
            submitted: false
          }
        }
      )
    }
    req.session.cart = [];
    res.status(201).send();
  } catch (err) {
    next(err)
  }
})
