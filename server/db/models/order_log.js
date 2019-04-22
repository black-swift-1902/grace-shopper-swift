const Sequelize = require('sequelize')
const db = require('../db')


const Order_log = db.define('order_log', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

module.exports = Order_log