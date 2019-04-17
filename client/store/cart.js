// export const LOAD_CART = 'LOAD_CART';
import axios from 'axios';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const CLEAR_CART = 'CLEAR_CART';

const initialState = {
<<<<<<< HEAD
  books: [{
    id: 1,
    title: 'Cornell University',
    imgUrl: 'https://tinyurl.com/y3y5c9wj',
    price: 5.99,
    description: 'GREAT BOOK! READ IT!'
  },
  {
    id: 2,
    title: 'Johns Hopkins University',
    imgUrl: 'https://tinyurl.com/y3wrug7u',
    price: 20,
    description: 'GREAT BOOK! READ IT!'
  },
  {
    id: 3,
    title: 'Wellesley College',
    imgUrl: 'https://tinyurl.com/y6zlp5pd',
    price: 10.1,
    description: 'GREAT BOOK! READ IT!'
  }]
=======
    books: [{
        id:1,
        title: 'Cornell University',
        imageUrl: 'https://tinyurl.com/y3y5c9wj',
        price: 5.99,
        description: 'GREAT BOOK! READ IT!'
      },
      {
        id:2,
        title: 'Johns Hopkins University',
        imageUrl: 'https://tinyurl.com/y3wrug7u',
        price: 20,
        description: 'GREAT BOOK! READ IT!'
      },
      {
        id:3,
        title: 'Wellesley College',
        imageUrl: 'https://tinyurl.com/y6zlp5pd',
        price: 10.1,
        description: 'GREAT BOOK! READ IT!'
      }]
>>>>>>> master
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
const addBook = function (book) {
  return {
    type: ADD_BOOK,
    book
  }
}

export const removeBook = function (book) {
  return {
    type: REMOVE_BOOK,
    book
  }
}

const clearCart = function (books) {
  return {
    type: CLEAR_CART,
    books
  }
}

export const submitOrder = function (books) {
  return async (dispatch) => {
    await axios.post('/api/orders', books.map(book => book.id));
    dispatch(clearCart(books));
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ADD_BOOK:
      newState.books = [...newState.books, action.book];
      break;

    case REMOVE_BOOK:
      newState.books = newState.books.filter(book => book.id !== action.book.id);
      break;
    
      case CLEAR_CART:
      newState.books = [];
      break;

    default:
      return newState;
  }
  return newState;
}
