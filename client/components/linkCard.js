import React from 'react'
import {connect} from 'react-redux'
import {flow} from 'lodash'
import {moveLinks, nullTargetId, sendChangesToDb} from '../store'
import {DragSource, DropTarget} from 'react-dnd'

const Types = {
  CARD: 'CARD'
}

const cardSource = {
  beginDrag: props => ({id: props.link.id, index: props.index}),
  endDrag(props, monitor) {
    const idSource = monitor.getItem().id
    const idTarget = props.targetId
    const collectionId = props.collectionId
    props.nullTargetId()
    if (idSource !== idTarget) {
      props.sendChangesToDb({idSource, idTarget, collectionId})
    }
  }
}

function collect(conn, monitor) {
  return {
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const cardTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    const dragId = monitor.getItem().id
    const hoverId = props.link.id

    // Don't replace items with themselves
    if (dragIndex === hoverIndex || dragId === hoverId) {
      return
    }

    // Time to actually perform the action
    props.moveLinks(dragIndex, hoverIndex, props.link.collectionId)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

const connectTarget = conn => ({
  connectDropTarget: conn.dropTarget()
})

// need to pass props to cmpnt
function linkCard(props) {
  const {link} = props

  const {isDragging, connectDragSource, connectDropTarget} = props
  const opacity = isDragging ? 0 : 1

  return (
    connectDragSource &&
    connectDropTarget &&
    connectDragSource(
      connectDropTarget(
        <div style={{opacity, marginLeft: '10px'}}>
          <div className="tags has-addons level">
            <div
              className=""
              style={{marginRight: '5px', marginBottom: '15px'}}
            >
              <img
                src={link.favicon}
                width="20px"
                height="auto"
                style={{verticalAlign: 'top'}}
              />
            </div>

            <a
              className="tag is-link level-item has-text-weight-semibold"
              href={link.url}
            >
              {link.title}
            </a>
            <a className="tag is-delete level-item" />
          </div>
        </div>
      )
    )
  )
}

const mapDispatch = dispatch => ({
  moveLinks: (sourceId, targetId, collectionId) =>
    dispatch(moveLinks(sourceId, targetId, collectionId)),
  nullTargetId: () => dispatch(nullTargetId()),
  sendChangesToDb: link => dispatch(sendChangesToDb(link))
})

const mapState = state => ({
  targetId: state.collections.dnd.targetId,
  collectionId: state.collections.dnd.collectionId
})

export default flow(
  DragSource(Types.CARD, cardSource, collect),
  DropTarget(Types.CARD, cardTarget, connectTarget),
  connect(mapState, mapDispatch)
)(linkCard)
