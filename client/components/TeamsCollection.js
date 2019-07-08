import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCollection, EditCollectionForm} from './index'
import {deleteCollectionThunk} from '../store'

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
      this.setState({...this.state, isInSelectMode: true})
    } else {
      this.setState({...this.state, isInSelectMode: false, isInEditMode: false})
    }
  }

  setEditMode = () => {
    if (!this.state.isInEditMode) {
      this.setState({...this.state, isInEditMode: true})
    } else {
      this.setState({...this.state, isInEditMode: false})
    }
  }

  render() {
    const {allTeamCollections} = this.props
    return (
      <div style={{border: '2px black solid', height: '800px'}} className="">
        <div>
          {allTeamCollections.map(collection => (
            <div key={collection.id}>
              {this.state.isInEditMode ? (
                <EditCollectionForm
                  resetSelectMode={this.setSelectMode}
                  collection={collection}
                />
              ) : (
                <div>
                  <h3>{collection.name}</h3>
                  <button onClick={this.setSelectMode}>...</button>
                  {this.state.isInSelectMode && (
                    <div>
                      <button onClick={this.setEditMode}>Edit Title</button>
                      <button
                        onClick={() => {
                          this.props.deleteCollection(collection.id)
                        }}
                      >
                        Delete Collection
                      </button>
                    </div>
                  )}
                </div>
              )}
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
