import React, {Component} from 'react'

//CREATE ADDLINKTHUNK AND CALL IT HERE
let initialState = {
  title: '',
  description: '',
  url: '',
  favicon: ''
}
class LinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({favicon: `${url.split('.com')[0]}.com/favicon.ico`})
    // this.props.updateUserThunk(this.props.userId, this.state)
    this.setState(initialState)
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
        <button type="button" className="open-button" onClick={this.openForm}>
          +
        </button>
        <div className="form-popup" id="myForm">
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label htmlFor="title">
              <b>Website:</b>
            </label>
            <input
              required
              type="text"
              name="title"
              placeholder="Enter Website"
              value={this.state.title}
              onChange={event => this.handleChange(event)}
            />
            <label htmlFor="description">
              <b>Description:</b>
            </label>
            <input
              required
              type="text"
              name="description"
              placeholder="Enter Description (optional)"
              value={this.state.description}
              onChange={event => this.handleChange(event)}
            />
            <label htmlFor="url">
              <b>URL:</b>
            </label>
            <input
              required
              type="text"
              name="url"
              placeholder="Enter url"
              value={this.state.url}
              onChange={event => this.handleChange(event)}
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

//FINISH THIS WITH ADDLINKTHUNK
// mapDispatch = () => {
//   addLink: dispatch => {}
// }

export default LinkForm
