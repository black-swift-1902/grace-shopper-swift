const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://paulayoo.com/blog/wp-content/uploads/2014/02/blankbook.jpg',
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Book
