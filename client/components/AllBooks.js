import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import SingleBook from './SingleBook'

/**
 * COMPONENT
 */

export const AllBooks = props => {
  const {booksArr} = props

  return (
    <div>
      {booksArr.map(book => {
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

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    booksArr: state.booksArr
  }
}

export default connect(mapState)(AllBooks)

/**
 * PROP TYPES
 */
AllBooks.propTypes = {
  booksArr: PropTypes.array
}
