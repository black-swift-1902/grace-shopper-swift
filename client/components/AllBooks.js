import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'


class AllBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksArr: []
    }
  }
  try {
    const books = await axios.get(`/api/books`)
  } catch (authError) {
    return dispatch(getBooks({error: authError}))
  }

  try {
    dispatch(getBooks(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}


/**
 * COMPONENT
 */
export const AllBooks = () => {

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}
/**
 * CONTAINER
 */

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
