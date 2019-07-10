import React, {Component} from 'react'
import {updateCollectionThunk} from '../store'
import {connect} from 'react-redux'
import '../style.css'

class EditCollectionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collectionName: ''
    }
  }

  componentDidMount = () => {
    this.setState({...this.state, collectionName: this.props.collection.name})
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.updateCollection(
      event.target.collectionName.value,
      this.props.collection.id
    )
    await this.props.closeForm()
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} className="editform-container">
            <label htmlFor="collectionName" />
            <input
              required
              type="text"
              name="collectionName"
              value={this.state.collectionName}
              onChange={event => this.handleChange(event)}
              className="input"
            />
            <button type="submit" className="button is-small">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

//FINISH THIS WITH ADDLINKTHUNK
const mapDispatch = dispatch => {
  return {
    updateCollection: (collectionName, collectionId, teamId) =>
      dispatch(updateCollectionThunk(collectionName, collectionId))
  }
}

export default connect(null, mapDispatch)(EditCollectionForm)
