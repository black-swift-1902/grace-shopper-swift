import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOneBook} from '../store'
import {Link} from 'react-router-dom'

class SingleBook extends Component {

  componentDidMount() {
    const bookId = this.props.match.params.id
    this.props.getOneBook(bookId)
  }
  
  render() {
    console.log('here are props', this.props)
    const {title, imgUrl, price, description} = this.props.selectBook
    return (
      <div>
        <h2>{title}</h2>
        <img src={imgUrl} />
        <h4>{price}</h4>
        <p>{description}</p>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return({

selectBook: state.selectBook

})}

const mapDispatch = dispatch => ({
  getOneBook: function(bookId) {
    return dispatch(getOneBook(bookId))
  }
})

/**
 * PROP TYPES
 */
SingleBook.propTypes = {
  selectBook: PropTypes.object
}

export default connect(mapState, mapDispatch)(SingleBook)
