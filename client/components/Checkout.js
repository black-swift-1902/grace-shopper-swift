import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeBook } from '../store'
import { submitOrder } from '../store'
/**
 * COMPONENT
 */

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  async componentDidMount() {
    this.setState({books: this.props.books});
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        {this.props.cart.books.map(book => {
          return (
            <div key={`book-${book.id}`}>
              <h2>{book.title}</h2>
              <img src={book.imgUrl} />
              <h4>{book.price}</h4>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  // console.log(state)
  return {
    books: state.cart.books
  }
}

const mapDispatch = (dispatch) => ({
  removeBook: () => dispatch(removeBook()),
  submitOrder: () => dispatch(submitOrder())
})


export default connect(mapState, mapDispatch)(Checkout)
