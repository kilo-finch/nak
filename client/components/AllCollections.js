import React, {Component} from 'react'
import {LinkCard, LinkForm, TeamsCollection} from './index'
import {connect} from 'react-redux'
import {allCollectionsThunk} from '../store'

class AllCollections extends Component {
  componentDidMount() {
    this.props.getAllCollections()
  }
  render() {
    return (
      <div style={{border: '2px black solid'}}>
        <div>
          {this.props.collections ? (
            this.props.collections.map((teamCollections, idx) => (
              <TeamsCollection allTeamCollections={teamCollections} key={idx} />
            ))
          ) : (
            <h3>Still Loading</h3>
          )}
        </div>
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

export default connect(mapState, mapDispatch)(AllCollections)
