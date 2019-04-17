import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getBooks} from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */

export class AllBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksArr: []
    }
  }

  // const {booksArr} = props

  async componentDidMount() {
    await this.props.getBooks()
  }

  render() {
    return (
      <div>
        {this.props.booksArr.map(book => {
          let id = book.id
          return (
            <div key={`book-${id}`}>
            <Link to={`/books/${id}`}>
                <h1>{book.title}</h1>
                <p><img src={book.imgUrl} /></p>
                <h4>{book.price}</h4>
            </Link>
            </div>
          )
        })}
      </div>
    )
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
