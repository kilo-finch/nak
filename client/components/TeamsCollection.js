import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCollection} from './index'

const TeamsCollection = props => {
  const {allTeamCollections} = props
  return (
    <div style={{border: '2px black solid', height: '800px'}}>
      <div>
        <h3>{allTeamCollections.teamName}</h3>
        {allTeamCollections.collections.map(collection => (
          <SingleCollection collection={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}

export default TeamsCollection
