const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./book');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  submitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Order.findByUserId = function (userId) {
  try {
    return Order.findAll({
      where: {
        userId,
        submitted: true
      },
      include: [{ model: Book }],
    })
  } catch (err) {
    console.error(err);
  }
}

Order.findCartByUserId = function (userId) {
  try {
    return Order.findOne({
      where: {
        userId,
        submitted: false
      },
      include: [{ model: Book,
      attributes: ['id', 'title', 'price', 'imgUrl', 'description'],
    }],  
    
    })
  } catch (err) {
    console.error(err);
  }
}


module.exports = Order