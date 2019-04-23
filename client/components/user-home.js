import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, orderHistory} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      {
        orderHistory && orderHistory.map(order => {
          return (
            <h3>Date: {order.updatedAt}</h3>
            
          )
        })
      }
    </div>
  )
}
/**
 * CONTAINER
 */

const mapState = state => {
  return {
    email: state.user.email,
    orderHistory: state.user.orderHistory
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
