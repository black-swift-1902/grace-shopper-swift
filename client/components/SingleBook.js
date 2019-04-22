import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOneBook} from '../store'
import {addToCart} from '../store/cart'

class SingleBook extends Component {
  componentDidMount() {
    const bookId = this.props.match.params.id
    this.props.getOneBook(bookId)
  }

  render() {
    const {title, imgUrl, price, description} = this.props.selectBook
    return (
      <div>
        <h2>{title}</h2>
        <img src={imgUrl} />
        <h4>{price}</h4>
        <p>{description}</p>
        <button onClick={() => this.props.addBookToCart(this.props.selectBook)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectBook: state.selectBook
  }
}

const mapDispatch = dispatch => ({
  getOneBook: function(bookId) {
    return dispatch(getOneBook(bookId))
  },
  addBookToCart: function(book) {
    return dispatch(addToCart(book))
  }
})

/**
 * PROP TYPES
 */
SingleBook.propTypes = {
  selectBook: PropTypes.object
}

export default connect(mapState, mapDispatch)(SingleBook)
