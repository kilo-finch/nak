import axios from 'axios'
import history from '../history'
import store from '.'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedCollection: [],
  // dnd: {targetId: null, collectionId: null}
  dnd: {targetId: null, collectionId: null, queue: [], lock: false, cache: []}
}
/**
 * ACTION TYPES
 */
const GOT_SELECTED_COLLECTION = 'GOT_SELECTED_COLLECTION'
const MOVE_LINKS = 'MOVE_LINKS'
const NULL_TARGETID = 'NULL_TARGETID'
const ADD_TO_QUEUE = 'ADD_TO_QUEUE'
const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE'
const ADD_LOCK = 'ADD_LOCK'
const REMOVE_LOCK = 'REMOVE_LOCK'

/**
 * ACTION CREATORS
 */
const gotSelectedCollection = selectedCollection => ({
  type: GOT_SELECTED_COLLECTION,
  selectedCollection
})

export const moveLinks = (sourceId, targetId, collectionId) => ({
  type: MOVE_LINKS,
  sourceId,
  targetId,
  collectionId
})

export const nullTargetId = () => ({type: NULL_TARGETID})

const addToQueue = link => ({type: ADD_TO_QUEUE, link})

const removeFromQueue = links => ({type: REMOVE_FROM_QUEUE, links})

const addLock = () => ({type: ADD_LOCK})
const removeLock = () => ({type: REMOVE_LOCK})

/**
 * THUNK CREATORS
 */
export const selectedCollectionThunk = teamId => async dispatch => {
  try {
    const res = await axios.get(`api/collections/${teamId}`)
    dispatch(gotSelectedCollection(res.data))
  } catch (error) {
    throw error
  }
}

let interval

const processQueue = dispatch => {
  const dnd = store.getState().collections.dnd
  console.log('store', store)
  if (!dnd.lock) {
    dispatch(addLock())
    axios.put('/api/links/reorder', dnd.queue).then(({data}) => {
      dispatch(removeLock())
    })
  }
}

export const addToQueueDb = link => dispatch => {
  dispatch(addToQueue(link))
  dispatch(nullTargetId())
  const dnd = store.getState().collections.dnd
  console.log('dnd store :', dnd)
  if (!dnd.lock && dnd.queue.length) {
    processQueue(dispatch)
  } else if (dnd.lock && dnd.queue.length) {
    if (!interval) interval = setInterval(processQueue, 1000)
  } else if (!dnd.queue.length && interval) {
    clearInterval(interval)
  }
}

// export const processQueue = link => dispatch => {
//     axios.put('/api/links/reorder', link)
// }

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SELECTED_COLLECTION:
      return {...state, selectedCollection: [...action.selectedCollection]}
    case MOVE_LINKS:
      let targetId
      const collectionId = action.collectionId
      const selectedCollection = [...state.selectedCollection]
      const newSelectedCollection = selectedCollection.map(el => {
        if (el.id === collectionId) {
          let newCollection = {...el, links: el.links}
          let links = newCollection.links
          targetId = links[action.targetId].id
          let temp = links[action.sourceId]
          links.splice(action.sourceId, 1)
          links.splice(action.targetId, 0, temp)
          return newCollection
        }
        return el
      })
      // let newCurrLinks = [...state.collections.selectedCollection[0].links]
      // let temp = newCurrLinks[dragIndex]
      // newCurrLinks.splice(action.sourceId, 1)
      // newCurrLinks.splice(action.targetId, 0, temp)
      // const selectedCollection = [...state.collections.selectedCollection]
      // selectedCollection[0].links = newCurrLinks
      return {
        ...state,
        selectedCollection: newSelectedCollection,
        dnd: {...state.dnd, targetId, collectionId}
      }
    case ADD_TO_QUEUE:
      console.log('state :', state)
      console.log('action :', action)
      return {
        ...state,
        dnd: {...state.dnd, queue: [...state.dnd.queue, action.link]}
      }
    case REMOVE_FROM_QUEUE:
      // action.links
      return {...state, dnd: {...state.dnd, lock: true, cache: []}}
    case ADD_LOCK:
      const cache = state.dnd.queue.map(el => el)
      const queue = []
      return {...state, dnd: {...state.dnd, lock: true, cache, queue}}
    case REMOVE_LOCK:
      return {...state, dnd: {...state.dnd, lock: false, cache: []}}
    case NULL_TARGETID:
      return {...state, dnd: {...state.dnd, tagretId: null, collectionId: null}}
    default:
      return state
  }
}
