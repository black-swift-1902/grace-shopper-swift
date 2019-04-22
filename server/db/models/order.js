const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./book');

const Order = db.define('order', {
  submitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Order.findByUserId = function (userId) {
  try {
    return Order.findAll({
      order: [['updatedAt', 'DESC']],
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