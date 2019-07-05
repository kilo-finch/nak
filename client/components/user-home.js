import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllCollections} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName} = props.user

  return (
    <div>
      <h3>Welcome, {`${firstName}`}</h3>
      <AllCollections />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    links: state.links
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
