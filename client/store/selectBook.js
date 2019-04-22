import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ONE_BOOK = 'GOT_ONE_BOOK'

/**
 * INITIAL STATE
 */
const selectBook = {}

/**
 * ACTION CREATORS
 */
const gotOneBook = book => {
  return {type: GOT_ONE_BOOK, book}
}

/**
 * THUNK CREATORS
 */

export const getOneBook = bookId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/books/${bookId}`)
    return dispatch(gotOneBook(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GOT_ONE_BOOK:
      return action.book
    default:
      return state;
  }
}
