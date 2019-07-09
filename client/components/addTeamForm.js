import React, {Component} from 'react'
// import {connect} from 'react-redux'
import axios from 'axios'

import Popup from 'reactjs-popup'

export default class AddTeamForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      members: []
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {name} = this.state
    const id = !this.state.teamId ? this.props.teams[0].id : this.state.teamId
    this.props.createCollection(name, id)
    this.setState({name: '', teamId: ''})
  }

  render() {
    return (
      <Popup
        trigger={<button className="button is-small"> Trigger</button>}
        position="right center"
      >
        <div className="control">
          <div className="field">
            <label className="label is-small">Team's name</label>
            <div className="control">
              <input
                name="name"
                className="input is-small"
                type="text"
                placeholder="Your awesome team"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
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
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link is-small">Create</button>
            </div>
            <div className="control">
              <button className="button is-text is-small">Cancel</button>
            </div>
          </div>
        </div>
      </Popup>
    )
  }
}

// FINISH THIS WITH ADDLINKTHUNK
// const mapDispatch = dispatch => ({
//   createCollection: (name, teamId) => dispatch(createCollection(name, teamId))
// })

// const mapState = state => {
//   return {
//     collections: state.collections.selectedCollection,
//     teams: state.teams.allTeams
//   }
// }

// export default connect(mapState)(AddTeamForm)
