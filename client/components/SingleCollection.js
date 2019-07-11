import React, {Component} from 'react'
import {LinkCard, LinkForm} from './index'

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

// const openAll = (event, links) => {
//   links.forEach(link => {
//     event.preventDefault()
//     window.open(link.url, '_blank')
//   })
//   window.focus()
// }

const SingleCollection = props => {
  const {collection} = props
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>
          {collection.links ? (
            <div
            // className="field is-grouped is-grouped-multiline"
            // style={{
            //   padding: '5px',
            //   position: 'relative',
            // }}
            >
              {collection.links.length > 0 ? (
                <div
                  className="field is-grouped is-grouped-multiline"
                  style={{
                    padding: '5px',
                    sposition: 'relative'
                  }}
                >
                  {collection.links.map((link, index) => (
                    <LinkCard link={link} index={index} key={link.id} />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() => openAll(event, collection.links)}
                    className="button is-primary is-primary is-outlined is-small"
                    style={{ position: 'absolute', right: '0', bottom: '0' }}
                  >
                    Open All
                  </button> */}
                </div>
              ) : (
                <h3>
                  You have no links saved in your collection! Add a link to get
                  started.
                </h3>
              )}
            </div>
          ) : (
            <h3>Still Loading</h3>
          )}
        </div>
      </div>
    </DndProvider>
  )
}

export default SingleCollection
