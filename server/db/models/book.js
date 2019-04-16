const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10,2)
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
})

module.exports = Book