import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_BOOKS = 'GOT_BOOKS'

/**
 * INITIAL STATE
 */
const booksArray = [];

/**
 * ACTION CREATORS
 */
const gotBooks = books => ({type: GOT_BOOKS, books})

/**
 * THUNK CREATORS
 */
export const getBooks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/books')
    dispatch(gotBooks(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = booksArray, action) {
  switch (action.type) {
    case GOT_BOOKS:
      return action.books
    default:
      return state
  }
}
