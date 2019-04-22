export const LOAD_CART = 'LOAD_CART'
import axios from 'axios'
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'
const CLEAR_CART = 'CLEAR_CART'

const initialState = []

/**
 * ACTION CREATORS
 */
const addBook = function(book_id) {
  return {
    type: ADD_BOOK,
    book_id
  }
}

export const removeBook = function(index) {
  return {
    type: REMOVE_BOOK,
    index
  }
}

const clearCart = function() {
  return {
    type: CLEAR_CART
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
    await axios.post('/api/cart', book)
    // dispatch(loadCart(book))
  }
}

export const getCartFromSession = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/cart')
    dispatch(loadCart(data))
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

export const submitOrder = function() {
  return async dispatch => {
    await axios.post('/api/orders');
    dispatch(clearCart());
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    case ADD_BOOK:
      // if(newState[action.book_id]) newState[action.book_id]++;
      break

    case REMOVE_BOOK:
    newState.splice(action.index, 1);
      break

    case CLEAR_CART:
      newState = [];
      console.log('clear');
      break

    case LOAD_CART:
      newState = action.books
      break

    default:
      return state
  }
  return newState
}
