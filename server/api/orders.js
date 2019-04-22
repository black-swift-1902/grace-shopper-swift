const router = require('express').Router()
const { Order, Book, Order_log } = require('../db/models')
const { Op } = require('sequelize');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if(!req.session.userId) res.sendStatus(404);
    const order = await Order.findByUserId(req.session.userId)
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
  console.log('body', req.body);
  try {
    if (!req.session.userId) {
      await Order.create({ submitted: true, total: rNumber(req.body.total) })
        .then(order => {
          req.session.cart.forEach(async book => 
            await order.addBook(book.id, { through: { quantity: book.order_log.quantity }}));
            return order;
        })
    }
    else {
      Order.update(
        { submitted: true, total: Number(req.body.total) },
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
