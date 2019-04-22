import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <h1 className="is-size-1 navbar-brand">BOOKS-A-LOT!</h1>
    <nav className="navbar-end">
      <div>
        <Link to="/books" className="nav-item">Books</Link>
        <Link to="/checkout" className="nav-item">Checkout</Link>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-item">Home</Link>
          <a href="#" onClick={handleClick} className="nav-item">
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-right">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/signup" className="nav-item">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
