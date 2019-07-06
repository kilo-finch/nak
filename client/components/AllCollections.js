import React, {Component} from 'react'
import {LinkCard, TeamsCollection, CreateCollectionForm} from './index'
import {connect} from 'react-redux'
import {selectedCollectionThunk, allTeamsThunk} from '../store'
import {Link, Route} from 'react-router-dom'

class AllCollections extends Component {
  constructor() {
    super()
    this.state = {selectedCollection: 0}
    this.selectCollection = this.selectCollection.bind(this)
  }

  componentDidMount() {
    this.props.getAllTeams()
  }

  selectCollection(selection) {
    this.props.getSelectedCollection(selection)
    this.setState({selectedCollection: selection})
  }

  render() {
    return (
      <div>
        {this.props.teams ? (
          <div>
            {this.props.teams.map(team => (
              <button
                onClick={() => this.selectCollection(team.id)}
                key={team.id}
                type="button"
              >
                {`${team.name}`}
              </button>
            ))}
          </div>
        ) : (
          <h3>Still Loading</h3>
        )}
        {this.props.collections ? (
          <TeamsCollection allTeamCollections={this.props.collections} />
        ) : (
          <h1>Still Loading</h1>
        )}
        <CreateCollectionForm teams={this.props.teams} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    collections: state.collections.selectedCollection,
    teams: state.teams.allTeams
  }
}

const mapDispatch = dispatch => {
  return {
    getSelectedCollection: teamId => dispatch(selectedCollectionThunk(teamId)),
    getAllTeams: () => dispatch(allTeamsThunk())
  }
}

export default connect(mapState, mapDispatch)(AllCollections)
