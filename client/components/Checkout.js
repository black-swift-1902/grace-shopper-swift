import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartFromSession,
  removeBookThunk,
  submitOrder,
  loadCart
} from '../store/cart'
/**
 * COMPONENT
 */

class Checkout extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   books: []
    // };
  }

  async componentDidMount() {
    console.log(`in component did mount!`)
    this.setState({books: this.props.books})
  }

  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    let {books} = this.props
    if (!books) books = []
    return (
      <div>
        {books.map((book, index) => {
          return (
            <div /*key={`book-${book.id}`}*/>
              <h2>{book.title}</h2>
              <button
                onClick={() => {
                  this.props.removeBookThunk(index)
                  this.props.loadCart()
                }}
              >
                delete
              </button>
              <img src={book.imgUrl} />
              <h4>{book.price}</h4>
            </div>
          )
        })}
        <button
          onClick={() =>
            this.props.submitOrder(this.props.books, this.props.user)
          }
        >
          Submit Order
        </button>
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapping state to props! here is state:', state)
  return {
    books: state.cart.books,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(getCartFromSession()),
  removeBookThunk: index => dispatch(removeBookThunk(index)),
  submitOrder: (books, user) => dispatch(submitOrder(books, user))
})

export default connect(mapState, mapDispatch)(Checkout)
