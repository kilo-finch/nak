import React, {Component} from 'react'

import {LinkCard, LinkForm} from './index'

const openAll = (event, links) => {
  links.forEach(link => {
    event.preventDefault()
    window.open(link.url, '_blank')
  })
  window.focus()
}

const SingleCollection = props => {
  const {collection} = props
  return (
    <div style={{border: '2px black solid', height: '400px'}}>
      <div>
        <button
          type="button"
          onClick={event => openAll(event, collection.links)}
          className="button is-primary is-size-6 has-text-weight-bold"
        >
          Open All
        </button>
      </div>
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
