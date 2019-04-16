const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./book');
const User = require('./user');

const Order = db.define('order', {
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
    }
})

Order.findByUserId = function (userId) {
    try {
      return Order.findAll({
        include: [{model: User, where: {id: userId }},
            {model: Book}],
        
      })
    } catch (err) {
      console.error(err);
    }
  }
module.exports = Order