import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCollection} from './index'

const TeamsCollection = props => {
  const {allTeamCollections} = props
  return (
    <div style={{border: '2px black solid', height: '800px'}}>
      <div>
        {allTeamCollections.map(collection => (
          <div key={collection.id}>
            <h3>{collection.name}</h3>
            <SingleCollection collection={collection} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamsCollection
