const User = require('./user')
const Order = require('./order');
const Book = require('./book');
const Order_log = require('./order_log');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Book.belongsToMany(Order, {through: Order_log})
Order.belongsToMany(Book, {through: Order_log})

Order.belongsTo(User)
User.hasMany(Order)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Book,
  Order,
  Order_log
}
