import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createTeamThunk} from '../store'
import axios from 'axios'

import Popup from 'reactjs-popup'

class AddTeamForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      members: '',
      open: false,
      nameError: null,
      membersError: null
    }
  }

  handleChange = async event => {
    await this.setState({
      [event.target.name]: event.target.value
    })
    if (this.state.name.length) {
      this.setState({nameError: null})
    } else {
      this.setState({nameError: 'Please, enter name of the team.'})
    }
  }

  createTeam = event => {
    event.preventDefault()
    if (this.state.name.length) {
      const {name, members} = this.state
      this.props.createTeamThunk({name, members})
      this.setState({name: '', members: '', open: false})
    } else {
      this.setState({nameError: 'Please, enter name of the team.'})
    }
  }

  closeForm = () => {
    this.setState({open: false})
  }

  openForm = () => {
    this.setState({open: true})
  }

  cancelForm = () => {
    this.setState({
      name: '',
      members: '',
      open: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <a
          button
          className="button is-link is-inverted"
          onClick={this.openForm}
        >
          +
        </a>
        <Popup
          open={this.state.open}
          position="right center"
          onClose={this.closeForm}
        >
          <div className="control">
            <div className="field">
              <label className="label is-small">Team's name</label>
              <div className="control">
                <input
                  name="name"
                  className="input is-small"
                  type="text"
                  placeholder="Name your team!"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <p className="help is-danger">{this.state.nameError}</p>
            </div>
            <div className="field">
              <label className="label  is-small">Members</label>
              <div className="control">
                <input
                  name="members"
                  className="input is-small"
                  type="text"
                  placeholder="email of team member"
                  value={this.state.members}
                  onChange={this.handleChange}
                />
              </div>
              <p className="help is-danger">{this.state.membersError}</p>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-link is-small"
                  onClick={this.createTeam}
                >
                  Create
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-text is-small"
                  onClick={this.cancelForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Popup>
      </React.Fragment>
    )
  }
}

// FINISH THIS WITH ADDLINKTHUNK
const mapDispatch = dispatch => ({
  createTeamThunk: team => dispatch(createTeamThunk(team))
})

// const mapState = state => {
//   return {
//     collections: state.collections.selectedCollection,
//     teams: state.teams.allTeams
//   }
// }

export default connect(null, mapDispatch)(AddTeamForm)
