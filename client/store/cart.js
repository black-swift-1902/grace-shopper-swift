// export const LOAD_CART = 'LOAD_CART';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const SUBMIT_ORDER = 'SUBMIT_ORDER';

initialState = {
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

const removeBook = function (book) {
    return {
        type: REMOVE_BOOK,
        book
    }
}

const submitOrder = function (books) {
    return {
        type: SUBMIT_ORDER,
        book
    }
}

const postOrder = function (books){
    return function (dispatch){
        dispatch(submitOrder(books));
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
      
        default:
            return newState;
    }
    return newState;
}
