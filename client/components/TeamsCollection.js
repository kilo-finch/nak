import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCollection, EditCollectionForm, OptionsMenu} from './index'
import {deleteCollectionThunk} from '../store'
import createCollectionForm from './createCollectionForm'

const collectionContainer = {
  border: '2px #34c992 solid',
  color: '#black',
  borderRadius: '15px',
  marginBottom: '25px',
  // backgroundColor: "#064372",
  height: '250px',
  maxHeight: '600px'
}

const collectionHeader = {
  background: 'linear-gradient(135deg, #34c992 0%,#44fbaa 99%)',
  // backgroundColor: "#34c992",
  padding: '15px',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px'
}

class TeamsCollection extends Component {
  constructor() {
    super()
    this.state = {
      isInEditMode: false,
      isInSelectMode: false
    }
    this.setEditMode = this.setEditMode.bind(this)
  }

  setSelectMode = () => {
    if (!this.state.isInSelectMode) {
      this.setState({isInSelectMode: true})
    } else {
      this.setState({isInSelectMode: false, isInEditMode: false})
    }
  }

  setEditMode = () => {
    if (!this.state.isInEditMode) {
      this.setState({isInEditMode: true})
    } else {
      this.setState({isInEditMode: false})
    }
  }

  openForm = () => {
    this.setSelectMode()
    // document.getElementById('editForm').style.display = 'block'
  }

  closeForm = () => {
    document.getElementById('editForm').style.display = 'none'
  }

  render() {
    const {allTeamCollections} = this.props
    return (
      <div>
        <div className="">
          {allTeamCollections.map(collection => (
            <div key={collection.id} style={collectionContainer}>
              <div className="level" style={collectionHeader}>
                <div className="level-left">
                  <h3 className=" level-left is-size-4 has-text-weight-bold">
                    {collection.name}
                  </h3>
                </div>
                <div className="level-right">
                  <OptionsMenu
                    collection={collection}
                    deleteCollection={this.props.deleteCollection}
                  />
                </div>
              </div>
              <SingleCollection collection={collection} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteCollection: collectionId =>
      dispatch(deleteCollectionThunk(collectionId))
  }
}

export default connect(null, mapDispatch)(TeamsCollection)
