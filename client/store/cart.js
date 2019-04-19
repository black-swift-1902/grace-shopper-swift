export const LOAD_CART = 'LOAD_CART'
import axios from 'axios'
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'
const CLEAR_CART = 'CLEAR_CART'

const initialState = {
  books: []
}

/**
 * ACTION CREATORS
 */
const addBook = function(book) {
  return {
    type: ADD_BOOK,
    book
  }
}

export const removeBook = function(index) {
  return {
    type: REMOVE_BOOK,
    index
  }
}

const clearCart = function(books) {
  return {
    type: CLEAR_CART,
    books
  }
}

const loadCart = function(books) {
  return {
    type: LOAD_CART,
    books
  }
}

export const addToCart = function(book) {
  return async dispatch => {
    const books = await axios.post('/api/cart', book)
    dispatch(addBook(books))
  }
}

export const getCartFromSession = function() {
  return async dispatch => {
    const books = await axios.get('/api/cart')
    dispatch(loadCart(books.data))
  }
}

export const removeBookThunk = function(index) {
  try {
    return async dispatch => {
      await axios.delete(`/api/cart/${index}`)
      dispatch(removeBook(index))
    }
  } catch (error) {
    console.error(error)
  }
}

export const submitOrder = function(books, user) {
  return async dispatch => {
    const order = {
      user,
      books: books.map(book => book.id)
    }
    await axios.post('/api/orders', order)
    dispatch(clearCart(books))
    await axios.delete('/api/cart')
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  let newState = {...state, books: [...state.books]}
  switch (action.type) {
    case ADD_BOOK:
      newState.books = [...newState.books, action.book]
      break

    case REMOVE_BOOK:
      newState.books.splice(action.index, 1)
      break

    case CLEAR_CART:
      newState.books = []
      break

    case LOAD_CART:
      newState.books = action.books
      break

    default:
      return newState
  }
  return newState
}
