import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <h1
        className=""
        style={{
          color: '#34c992',
          fontWeight: 'bolder',
          fontFamily: 'Helvetica',
          paddingInlineStart: '63px',
          fontSize: '5em'
        }}
      >
        A new way to keep your tabs<br />safe and organized.
      </h1>
      <div
        id="divForLogin"
        style={{paddingLeft: '63px', paddingTop: '70px', width: '200px'}}
      >
        <form onSubmit={handleSubmit} name={name} />
        <button
          type="button"
          className="button is-primary is-outlined level-item is-size-5 has-text-weight-bold"
        >
          <a href="/auth/google">{displayName} with Google</a>
        </button>
      </div>
      <div className="level" style={{marginTop: '50px', marginBottom: '100px'}}>
        {/* <video
          width="640"
          height="480"
          controls="controls"
          poster="image"
          autoPlay="true"
          loop="true"
          muted="true"
        >
          <source src="/video/webintro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <div
          className="level-item"
          style={{
            width: '250px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'align-items'
          }}
        >
          <p
            className="is-size-4 is-primary has-text-centered level-item"
            style={{
              color: '#34c992',
              fontWeight: 'bolder',
              fontFamily: 'Helvetica',
              fontSize: '1.2em',
              marginRight: '25px'
            }}
          >
            Download our Chrome Extension:
          </p>
          <button
            type="button"
            className="button is-primary is-outlined is-size-6 has-text-weight-bold"
            style={{}}
          >
            <a
              href="https://chrome.google.com/webstore/detail/nak/pcdpnkbhkokjcjanmbophfdledelkoao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
