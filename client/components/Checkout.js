import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeBook } from '../store/cart'
import { submitOrder } from '../store/cart'
/**
 * COMPONENT
 */

class Checkout extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   books: []
    // };
  }

  // async componentDidMount() {
  //   this.setState({books: this.props.books});
  // }

  render() {
    return (
      
      <div>
        {this.props.books.map(book => {
          return (
            <div key={`book-${book.id}`}>
              <h2>{book.title}</h2>
              <button onClick = {() => this.props.removeBook(book)} >delete</button>
              <img src={book.imgUrl} />
              <h4>{book.price}</h4>
            </div>
          )
        })}
        <button onClick = {() => this.props.submitOrder(this.props.books, this.props.user)} >Submit Order</button>
      </div>
    )
  }
}

const mapState = state => {

  return {
    books: state.cart.books,
    user: state.user
  }
}

const mapDispatch = (dispatch) => ({
  removeBook: (book) => dispatch(removeBook(book)),
  submitOrder: (books, user) => dispatch(submitOrder(books, user))
})


export default connect(mapState, mapDispatch)(Checkout)
