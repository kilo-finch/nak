import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCollection, EditCollectionForm} from './index'
import {deleteCollectionThunk} from '../store'

const collectionContainer = {
  border: '2px #34c992 solid',
  height: '400px',
  color: '#black',
  borderRadius: '15px',
  marginBottom: '25px'
}

const collectionHeader = {
  backgroundColor: '#34c992',
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
      <div>
        <div className="">
          {allTeamCollections.map(collection => (
            <div key={collection.id} style={collectionContainer}>
              {this.state.isInEditMode ? (
                <EditCollectionForm
                  resetSelectMode={this.setSelectMode}
                  collection={collection}
                />
              ) : (
                <div className="level" style={collectionHeader}>
                  <div className="level-left">
                    <h3 className="level-item is-size-4 has-text-weight-bold">
                      {collection.name}
                    </h3>
                  </div>
                  <div className="level-right">
                    <button onClick={this.setSelectMode} className="level-item">
                      ...
                    </button>
                    {this.state.isInSelectMode && (
                      <div className="level-item">
                        <button
                          onClick={this.setEditMode}
                          className="level-item"
                        >
                          Edit Title
                        </button>
                        <button
                          onClick={() => {
                            this.props.deleteCollection(collection.id)
                          }}
                          className="level-item"
                        >
                          Delete Collection
                        </button>
                      </div>
                    )}
                  </div>
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
