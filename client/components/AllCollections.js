import React, {Component} from 'react'
import {LinkCard, LinkForm, TeamsCollection} from './index'
import {connect} from 'react-redux'
import {selectedCollectionThunk, allTeamsThunk} from '../store'
import {Link, Route} from 'react-router-dom'

class AllCollections extends Component {
  async componentDidMount() {
    await this.props.getAllTeams()
    await this.props.getSelectedCollection(this.props.teams[0].id)
  }

  selectCollection(selection) {
    this.props.getSelectedCollection(selection)
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
              >{`${team.name}`}</button>
            ))}
          </div>
        ) : (
          <h3>Still Loading</h3>
        )}
        {this.props.collections.length ? (
          <TeamsCollection allTeamCollections={this.props.collections} />
        ) : (
          <h1>Still Loading</h1>
        )}
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
