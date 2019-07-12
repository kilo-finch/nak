import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../style.css'

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
        <h1>Welcome to NAK</h1>
      </div>
    )
  }
}

//FINISH THIS WITH ADDLINKTHUNK
// const mapDispatch = dispatch => {
//   return {
//     updateCollection: (collectionName, collectionId, teamId) =>
//       dispatch(updateCollectionThunk(collectionName, collectionId))
//   }
// }

export default connect(null, null)(LandingPage)
