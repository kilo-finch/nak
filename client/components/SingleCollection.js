import React, {Component} from 'react'
import {LinkCard} from './index'
import {connect} from 'react-redux'

const SingleCollection = props => {
  const {collection} = props
  return (
    <div style={{border: '2px black solid', height: '400px'}}>
      <div>
        {collection.links ? (
          collection.links.map(link => <LinkCard link={link} key={link.id} />)
        ) : (
          <h3>
            You have no links saved in your collection! Add a link to get
            started.
          </h3>
        )}
      </div>
    </div>
  )
}

export default SingleCollection
