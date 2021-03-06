import React, {Component} from 'react'
import collections, {createCollection} from '../store/collections'
import {connect} from 'react-redux'
import '../style.css'

class CreateCollectionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      teamId: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
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

  openForm = () => {
    document.getElementById('myForm').style.display = 'block'
  }

  closeForm = () => {
    document.getElementById('myForm').style.display = 'none'
  }

  render() {
    const {teams} = this.props
    return (
      <div>
        <button type="button" className="open-button" onClick={this.openForm}>
          +
        </button>
        <div className="form-popup" id="myForm">
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label htmlFor="name" className="label">
              <b>Select Team:</b>
            </label>
            <div className="select is-primary">
              <select
                value={this.state.teamId}
                name="teamId"
                onChange={this.handleChange}
              >
                {teams
                  ? teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <label htmlFor="name" className="label">
              <b>Collection Name:</b>
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter name of new collection..."
              value={this.state.name}
              onChange={event => this.handleChange(event)}
              className="input"
            />
            <button type="submit" className="btn">
              Submit
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={this.closeForm}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    )
  }
}

// FINISH THIS WITH ADDLINKTHUNK
const mapDispatch = dispatch => ({
  createCollection: (name, teamId) => dispatch(createCollection(name, teamId))
})

export default connect(null, mapDispatch)(CreateCollectionForm)
