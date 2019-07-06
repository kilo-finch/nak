import React from 'react'
import {connect} from 'react-redux'
import {flow} from 'lodash'
import {moveLinks} from '../store'

import {
  DragSource,
  // useDrag,
  DropTarget
  // ConnectDropTarget,
  // ConnectDragSource,
  // DropTargetMonitor,
  // DropTargetConnector,
  // DragSourceConnector,
  // DragSourceMonitor
} from 'react-dnd'

const Types = {
  CARD: 'CARD'
}

const cardSource = {
  beginDrag: props => ({id: props.link.id, index: props.index}),
  endDrag(props, monitor, component) {
    // if (!monitor.didDrop()) {
    // }
    // const item = monitor.getItem()
    // const dropResult = monitor.getDropResult()
    // props.moveCard(props.index, item.index)
    // CardAction.moveCardToList(item.id, dropResult.listId)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    console.log({props, monitor, component})
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    const dragId = monitor.getItem().id
    const hoverId = props.link.id

    // console.log({dragId, hoverId})

    // console.log({dragIndex, hoverIndex})
    // Don't replace items with themselves
    if (dragIndex === hoverIndex || dragId === hoverId) {
      return
    }
    // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // // Determine mouse position
    // const clientOffset = monitor.getClientOffset()

    // // Get pixels to the top
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // // Only perform the move when the mouse has crossed half of the items height
    // // When dragging downwards, only move when the cursor is below 50%
    // // When dragging upwards, only move when the cursor is above 50%
    // // Dragging downwards
    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //   return
    // }

    // // Dragging upwards
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return
    // }

    // Time to actually perform the action
    // props.moveCard(dragIndex, hoverIndex)
    props.moveLinks(dragIndex, hoverIndex, props.link.collectionId)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

const connectTarget = connect => ({
  connectDropTarget: connect.dropTarget()
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
        <div className="control" style={{opacity}}>
          <div className="tags has-addons">
            <a className="tag is-link" href={link.url}>
              {link.title}
            </a>
            <a className="tag is-delete" />
          </div>
        </div>
      )
    )
  )
  // (
  //   <div>
  //     <a target="_blank" href={`${link.url}`}>
  //       <div>
  //         <img src={link.favicon} alt="favicon" />
  //         <h4 className="link-title">{link.title}</h4>
  //         <div className="description-tag">
  //           <p>{link.description}</p>
  //         </div>
  //       </div>
  //     </a>
  //   </div>
  // )
}

const mapDispatch = dispatch => ({
  moveLinks: (sourceId, targetId, collectionId) =>
    dispatch(moveLinks(sourceId, targetId, collectionId))
})

export default flow(
  DragSource(Types.CARD, cardSource, collect),
  DropTarget(Types.CARD, cardTarget, connectTarget),
  connect(null, mapDispatch)
)(linkCard)

//   const drag1 = DragSource(Types.CARD, cardSource, collect)(linkCard)
//   const drag2 = DropTarget(Types.CARD, cardTarget, connectTarget)(drag)

// export default connect()(drag2)
