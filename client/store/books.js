import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_BOOKS = 'GOT_BOOKS'

/**
 * INITIAL STATE
 */
const intialState = {booksArr: []}

/**
 * ACTION CREATORS
 */
const gotBooks = books => ({type: GET_BOOKS, books})

/**
 * THUNK CREATORS
 */
export const getBooks = () => async dispatch => {
  try {
    const {res} = await axios.get('/api/books')
    dispatch(gotBooks(res))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_BOOKS:
      return {...state, booksArr: action.books}
    default:
      return state
  }
}
