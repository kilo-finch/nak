import React, {Component} from 'react'
import collections, {createCollection} from '../store/collections'
import {connect} from 'react-redux'
import '../style.css'
import {EditCollectionForm} from '.'

const openAll = (event, links) => {
  links.forEach(link => {
    event.preventDefault()
    window.open(link.url, '_blank')
  })
  window.focus()
}

class OptionsMenu extends Component {
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

  openOptions = () => {
    let optionsMenu = document.getElementById(
      `options-menu${this.props.collection.id}`
    )
    let editForm = document.getElementById(
      `edit-form${this.props.collection.id}`
    )
    if (optionsMenu.style.display === 'none') {
      if (editForm.style.display !== 'block') {
        optionsMenu.style.display = 'block'
      } else {
        editForm.style.display = 'none'
      }
    } else {
      optionsMenu.style.display = 'none'
    }
  }

  closeOptions = () => {
    document.getElementById(
      `options-menu${this.props.collection.id}`
    ).style.display =
      'none'
  }

  openForm = () => {
    document.getElementById(
      `edit-form${this.props.collection.id}`
    ).style.display =
      'block'
    this.closeOptions()
  }

  closeForm = () => {
    document.getElementById(
      `edit-form${this.props.collection.id}`
    ).style.display =
      'none'
    document.getElementById(
      `options-menu${this.props.collection.id}`
    ).style.display =
      'none'
  }

  render() {
    const {collection, deleteCollection} = this.props
    return (
      <div className="level bread-crumbs-container">
        <button
          type="button"
          className="level-item open-menu button"
          onClick={this.openOptions}
        >
          ...
        </button>
        <div
          className="level-item menu-popup"
          id={`options-menu${collection.id}`}
          style={{display: 'none'}}
        >
          <button onClick={this.openForm} className="button">
            Edit Title
          </button>
          <button
            type="button"
            onClick={() => openAll(event, collection.links)}
            className="button is-pulled-left"
            style={{marginLeft: '10px', marginRight: '10px'}}
          >
            Open All
          </button>
          {!collection.userPersonalCollection && (
            <button
              onClick={() => {
                deleteCollection(collection.id)
              }}
              className="button level-item"
              style={{position: 'absolute', right: '200px', bottom: '0'}}
            >
              Delete Collection
            </button>
          )}
        </div>
        <div
          className="level-item edit-form-popup"
          id={`edit-form${collection.id}`}
        >
          <EditCollectionForm
            collection={collection}
            closeForm={this.closeForm}
          />
        </div>
      </div>
    )
  }
}

// FINISH THIS WITH ADDLINKTHUNK
const mapDispatch = dispatch => ({
  createCollection: (name, teamId) => dispatch(createCollection(name, teamId))
})

export default connect(null, mapDispatch)(OptionsMenu)
