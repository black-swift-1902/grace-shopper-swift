import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getCartFromSession,
  removeBookThunk,
  submitOrder
} from '../store/cart'
/**
 * COMPONENT
 */

class Checkout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    let { books } = this.props;
    return (
      <div>
        {books.map((book, index) => {
          return (
            <div key={`book-${book.id}`}>
              <h2>{book.title}</h2>
              <button
                onClick={() => {
                  this.props.removeBookThunk(index);
                }}
              >
                delete
              </button>
              <img src={book.imgUrl} />
              <h4>{book.price}</h4>
              <h4>{book.order_log.quantity}</h4>
            </div>
          )
        })}
        {
          books.length ? <button
            onClick={() =>
              this.props.submitOrder()
            }
          >
            Submit Order
        </button> : undefined
        }

      </div>
    )
  }
}

const mapState = state => {
  return {
    books: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(getCartFromSession()),
  removeBookThunk: index => dispatch(removeBookThunk(index)),
  submitOrder: () => dispatch(submitOrder())
})

export default connect(mapState, mapDispatch)(Checkout)
