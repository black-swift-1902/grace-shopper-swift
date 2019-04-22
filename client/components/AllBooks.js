import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getBooks} from '../store'
import SingleBookCard from './SingleBookCard'

/**
 * COMPONENT
 */

export class AllBooks extends Component {

  componentDidMount() {
    this.props.getBooks()
  }

  render() {
    return <div>
        <h1 className="is-size-2 has-text-centered">Our Books</h1>
        <hr />
        <div className="columns">
          {this.props.booksArr.map(book => {
            return <SingleBookCard key={`book-${book.id}`} book={book} className="column is-one-third has-text-centered" />
          })}
        </div>
      </div>
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    booksArr: state.books
  }
}

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks())
})


/**
 * PROP TYPES
 */
AllBooks.propTypes = {
  booksArr: PropTypes.array
}
export default connect(mapState, mapDispatch)(AllBooks)
