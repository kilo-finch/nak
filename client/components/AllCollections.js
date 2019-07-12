import React, {Component} from 'react'
import {
  LinkCard,
  TeamsCollection,
  CreateCollectionForm,
  AddTeamForm
} from './index'
import {connect} from 'react-redux'
import {selectedCollectionThunk, allTeamsThunk, deleteTeamThunk} from '../store'
import {Link, Route} from 'react-router-dom'

class AllCollections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelection: null,
      currentTeam: null
    }
  }

  async componentDidMount() {
    await this.props.getAllTeams()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.teams !== prevProps.teams) {
      await this.props.getSelectedCollection(this.props.teams[0].id)
      this.selectCollection(this.props.teams[0].id)
    }
  }

  selectCollection(selection) {
    let selectedCollection = document.getElementsByClassName(
      `teamName${selection}`
    )[0]
    let selectedTeam = selection
    if (
      this.state.currentSelection !== null &&
      this.state.currentSelection.className !== selectedCollection.className
    ) {
      this.state.currentSelection.classList.toggle('is-active')
      selectedCollection.classList.toggle('is-active')
    } else if (this.state.currentSelection === null) {
      selectedCollection.classList.toggle('is-active')
    }
    this.setState({currentSelection: selectedCollection, selectedTeam})
    this.props.getSelectedCollection(selection)
  }

  render() {
    return (
      <div className="">
        {this.props.teams ? (
          <div className="tabs is-boxed is-toggled">
            <ul>
              {this.props.teams.map(team => (
                <li
                  className={`teamName${team.id}`}
                  style={{
                    marginRight: '5px',
                    backgroundColor: '#34c992',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px'
                  }}
                  key={team.id}
                >
                  <a
                    onClick={() => this.selectCollection(team.id)}
                    key={team.id}
                    type="button"
                    className="has-text-weight-bold"
                  >
                    {`${team.name}`}
                  </a>{' '}
                </li>
              ))}
              <li>
                <AddTeamForm />
              </li>{' '}
            </ul>
            {this.props.teams.length > 0 &&
            this.state.selectedTeam !== this.props.teams[0].id ? (
              <button
                className="button"
                onClick={() => this.props.deleteTeam(this.state.selectedTeam)}
              >
                Delete Team
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          <h3>Still Loading</h3>
        )}
        <CreateCollectionForm teams={this.props.teams} />
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
    getAllTeams: () => dispatch(allTeamsThunk()),
    deleteTeam: teamId => dispatch(deleteTeamThunk(teamId))
  }
}

export default connect(mapState, mapDispatch)(AllCollections)
