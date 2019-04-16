const router = require('express').Router()
const {Book} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    console.log(books);
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleBook = await Book.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(singleBook)
  } catch (err) {
    next(err)
  }
})
