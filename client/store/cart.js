export const LOAD_CART = 'LOAD_CART'
import axios from 'axios'
// const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'
const CLEAR_CART = 'CLEAR_CART'

const initialState = []
/**
 * ACTION CREATORS
 */

export const removeBook = function (index) {
  return {
    type: REMOVE_BOOK,
    index
  }
}

export const clearCart = function () {
  return {
    type: CLEAR_CART
  }
}

const loadCart = function (books) {
  return {
    type: LOAD_CART,
    books
  }
}

export const addToCart = function (book) {
  return async dispatch => {
    await axios.post('/api/cart', book);
    const { data } = await axios.get('/api/cart');
    data.message = 'Item added to cart';
    dispatch(loadCart(data))
  }
}

export const getCartFromSession = function () {
  return async dispatch => {
    const { data } = await axios.get('/api/cart')
    dispatch(loadCart(data))
  }
}

export const removeBookThunk = function (index) {

  return async dispatch => {
      await axios.delete(`/api/cart/${index}`)
      dispatch(removeBook(index))
  }
}

export const submitOrder = function (total) {
  return async dispatch => {
    await axios.post('/api/orders', total);
    dispatch(clearCart());
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  let newState = [...state];
  switch (action.type) {

    case REMOVE_BOOK:
      newState.splice(action.index, 1);
      break

    case CLEAR_CART:
      newState = [];
      break

    case LOAD_CART:
      newState = action.books
      break

    default:
      return state
  }
  return newState
}
