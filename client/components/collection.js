import React, {Component} from 'react'
import {LinkCard, LinkForm} from './index'
import {connect} from 'react-redux'
import {allCollectionsThunk} from '../store'

class Collection extends Component {
  componentDidMount() {
    this.props.getAllCollections()
  }
  render() {
    const {links} = this.props
    return (
      <div style={{border: '2px black solid'}}>
        <div>
          {links ? (
            links.map(link => <LinkCard props={link} key={link.id} />)
          ) : (
            <h3>
              You have no links saved in your collection! Add a link to get
              started.
            </h3>
          )}
        </div>
        <LinkForm />
      </div>
    )
  }
}

const mapState = state => {
  return {
    collections: state.collections.allCollections
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCollections: () => dispatch(allCollectionsThunk())
  }
}

export default connect(mapState, mapDispatch)(Collection)
