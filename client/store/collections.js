import axios from 'axios'
// import history from '../history'
import store from '.'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedCollection: [],
  dnd: {targetId: null, collectionId: null}
}
/**
 * ACTION TYPES
 */
const GOT_SELECTED_COLLECTION = 'GOT_SELECTED_COLLECTION'
const MOVE_LINKS = 'MOVE_LINKS'
const NULL_TARGETID = 'NULL_TARGETID'

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

export const sendChangesToDb = link => dispatch => {
  const {idSource, idTarget, collectionId} = link
  if (idSource && idTarget && collectionId) {
    axios.put('/api/links/reorder', link)
  }
}

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
      return {
        ...state,
        selectedCollection: newSelectedCollection,
        dnd: {...state.dnd, targetId, collectionId}
      }
    case NULL_TARGETID:
      return {...state, dnd: {...state.dnd, targetId: null, collectionId: null}}
    default:
      return state
  }
}
