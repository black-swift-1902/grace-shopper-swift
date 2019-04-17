// export const LOAD_CART = 'LOAD_CART';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const SUBMIT_ORDER = 'SUBMIT_ORDER';

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
export default function cartReducer(state = initialState, action) {
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
