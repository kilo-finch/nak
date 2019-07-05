import React, {Component} from 'react'
import {LinkCard, LinkForm, TeamsCollection} from './index'
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
    console.log(this.props.collection)
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
        {this.props.collection ? (
          // <TeamsCollection
          //   allTeamCollections={this.props.collection[0]}
          //   teamName={this.props.teams[this.state.selectedCollection].name}
          // />
          <h1>Coming Soon!</h1>
        ) : (
          <h1>Still Loading</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    collection: state.collections.selectedCollection,
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
