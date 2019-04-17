// export const LOAD_CART = 'LOAD_CART';
import axios from 'axios'
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'
const CLEAR_CART = 'CLEAR_CART'

const initialState = {
  books: []
}

//action creators
// export const loadCart = function(books){
//     return {
//         type: LOAD_CART,
//         books
//     }
// }

/**
 * ACTION CREATORS
 */
const addBook = function(book) {
  return {
    type: ADD_BOOK,
    book
  }
}

export const removeBook = function(book) {
  return {
    type: REMOVE_BOOK,
    book
  }
}

const clearCart = function(books) {
  return {
    type: CLEAR_CART,
    books
  }
}

export const submitOrder = function (books, user) {
  return async (dispatch) => {
    const order = {
      user,
      books: books.map(book => book.id)
    }
    await axios.post('/api/orders', order);
    dispatch(clearCart(books));
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const newState = {...state}
  switch (action.type) {
    case ADD_BOOK:
      newState.books = [...newState.books, action.book]
      break

    case REMOVE_BOOK:
      newState.books = newState.books.filter(book => book.id !== action.book.id)
      break

    case CLEAR_CART:
      newState.books = []
      break

    default:
      return newState
  }
  return newState
}
