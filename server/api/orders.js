const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/user/:userId', async (req, res, next) => {
    try {
      const order = await Order.findByUserId(req.params.id)
      res.json(order)
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
        Order.create(req.body)
        .then(result => res.status(201).send(result));
    } catch (err) {
      next(err)
    }
  })