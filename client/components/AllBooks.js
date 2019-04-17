import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import SingleBook from './SingleBook'
import {getBooks} from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */

export class AllBooks extends Component {
  constructor(props) {
    console.log('AllBooks')
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
    console.log(this.props)
    return (
      <div>
        {this.props.booksArr.map(book => {
          return (
            <div key={`book-${book.id}`}>
              <SingleBook
                imgUrl={book.imgUrl}
                title={book.title}
                price={book.price}
                description={book.description}
              />
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
  console.log(state)
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
