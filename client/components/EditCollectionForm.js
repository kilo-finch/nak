import React, {Component} from 'react'
import {updateCollectionThunk} from '../store'
import {connect} from 'react-redux'

//CREATE ADDLINKTHUNK AND CALL IT HERE

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
    console.log(event.target.collectionName.value)
    await this.props.updateCollection(
      event.target.collectionName.value,
      this.props.collection.id,
      this.props.collection.teamId
    )
    await this.props.resetSelectMode()
  }
  ////////////////////////////////
  openForm = () => {
    document.getElementById('myForm').style.display = 'block'
  }

  closeForm = () => {
    document.getElementById('myForm').style.display = 'none'
  }
  ///////////////////////////////
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="collectionName">
              <b>Collection Name:</b>
            </label>
            <input
              required
              type="text"
              name="collectionName"
              value={this.state.collectionName}
              onChange={event => this.handleChange(event)}
            />
            <button type="submit" className="btn">
              Submit
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={this.props.resetSelectMode}
            >
              Close
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
      dispatch(updateCollectionThunk(collectionName, collectionId, teamId))
  }
}

export default connect(null, mapDispatch)(EditCollectionForm)
