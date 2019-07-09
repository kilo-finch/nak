import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import logo from '../../public/images/nak-logo-lm-02.png'

const Navbar = ({handleClick, isLoggedIn}) => (
  <section
    className="hero is-secondary"
    style={{marginLeft: '3.2vw', marginRight: '5vw'}}
  >
    <div className="hero-body level">
      <div className="level-left">
        <img
          src="/images/nak-logo-lm-02.png"
          alt="nak"
          className="level-item"
          width="100px"
        />
      </div>

      <nav className="level-right">
        {isLoggedIn ? (
          <div style={{margin: '0'}}>
            {/* The navbar will show these links after you log in */}
            {/* <Link to="/home">Home</Link> */}
            <a href="#" onClick={handleClick} className="level-item is-size-5">
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            {/* <Link to="/login">Login</Link> */}
            {/* <Link to="/signup">Sign Up</Link> */}
          </div>
        )}
      </nav>
    </div>
  </section>
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
