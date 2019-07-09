import React, {Component} from 'react'
import {LinkCard, TeamsCollection, CreateCollectionForm} from './index'
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
      <div className="">
        {this.props.teams ? (
          <div className="">
            {this.props.teams.map(team => (
              <button
                onClick={() => this.selectCollection(team.id)}
                key={team.id}
                type="button"
                className="button is-primary is-size-6 has-text-weight-bold"
              >
                {`${team.name}`}
              </button>
            ))}
          </div>
        ) : (
          <h3>Still Loading</h3>
        )}
        {this.props.collections ? (
          <div>
            {this.props.collections.length > 0 ? (
              <TeamsCollection allTeamCollections={this.props.collections} />
            ) : (
              <h1>No Collections Found</h1>
            )}
          </div>
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
