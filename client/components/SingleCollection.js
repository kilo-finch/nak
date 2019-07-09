import React, {Component} from 'react'
import {LinkCard, LinkForm} from './index'

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

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
    <DndProvider backend={HTML5Backend}>
      <div
        style={{border: '2px black solid', height: '400px'}}
        className="container"
      >
        <div className="field is-grouped is-grouped-multiline">
          {collection.links ? (
            collection.links.map((link, index) => (
              <LinkCard link={link} index={index} key={link.id} />
            ))
          ) : (
            <h3>
              You have no links saved in your collection! Add a link to get
              started.
            </h3>
          )}
        </div>
        {/* <LinkForm /> */}
      </div>
    </DndProvider>
  )
}

export default SingleCollection
