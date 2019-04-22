const router = require('express').Router()
const { Order, Book, Order_log } = require('../db/models')
const sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = [];
    const index = req.session.cart.findIndex(book => book.id === req.body.id);
    if (index < 0) {
      req.body.order_log = {};
      req.body.order_log.quantity = 1;
      if (req.session.userId) {
        if (!req.session.cart.length) {
          const book = await Book.findOne({
            where: { id: req.body.id }
          })
          await Order.create().then(async order => {
            await order.addBook(book);
            await order.setUser(req.session.userId);
            req.body.order_log.orderId = order.id;
          })
        }
        //insert new item to cart
        else {
          await Order_log.create({
            bookId: req.body.id,
            orderId: req.session.cart[0].order_log.orderId
          })
        }
      }
      req.session.cart.push(req.body);
    }
    //modify quantity
    else {
      if (req.session.userId) {
        Order_log.update({
          quantity: sequelize.literal('quantity + 1')
        },
          {
            where: {
              bookId: req.body.id,
              orderId: req.session.cart[0].order_log.orderId
            }
          })
      }
      req.session.cart[index].order_log.quantity++;
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/:index', async (req, res, next) => {
  try {
    if (req.session.userId) {
      if (req.session.cart.length === 1) {
        if (req.session.userId) {
          await Order.destroy({
            where: {
              userId: req.session.userId,
              submitted: false
            }
          })
        }
        req.session.cart = [];
      }
      else {
        await Order_log.destroy({
          where: {
            bookId: req.session.cart[req.params.index].id,
            orderId: req.session.cart[0].order_log.orderId
          }
        })
      }
    }

    req.session.cart.splice(req.params.index, 1);
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})
