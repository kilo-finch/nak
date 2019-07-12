/* eslint-disable no-case-declarations */
import axios from 'axios'
// import history from '../history'
import store from '.'

/**
 * INITIAL STATE SELECTED COLLECTION IS TEAM
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
const UPDATE_COLLECTION = 'UPDATE_COLLECTION'
const DELETE_COLLECTION = 'DELETE_COLLECTION'
const CREATE_COLLECTION = 'CREATE_COLLECTION'
const REMOVE_LINK = 'REMOVE_LINK'

/**
 * ACTION CREATORS
 */
export const gotSelectedCollection = selectedCollection => ({
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

export const updateCollection = updatedCollection => ({
  type: UPDATE_COLLECTION,
  updatedCollection
})

export const deleteCollection = deletedCollection => ({
  type: DELETE_COLLECTION,
  deletedCollection
})

export const createdCollection = newCollection => ({
  type: CREATE_COLLECTION,
  newCollection
})

const removeLink = linkId => ({
  type: REMOVE_LINK,
  linkId
})

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

export const updateCollectionThunk = (
  collectionName,
  collectionId
) => async dispatch => {
  try {
    const res = await axios.put(`api/collections/${collectionId}`, {
      collectionName
    })
    dispatch(updateCollection(res.data[0]))
  } catch (error) {
    throw error
  }
}

export const createCollection = (name, teamId) => async dispatch => {
  try {
    const {data} = await axios.post(`api/collections/${teamId}`, {name})
    dispatch(createdCollection(data))
  } catch (error) {
    throw error
  }
}

export const deleteCollectionThunk = collectionId => async dispatch => {
  try {
    const res = await axios.delete(`api/collections/${collectionId}`)
    dispatch(deleteCollection(collectionId))
  } catch (error) {
    throw error
  }
}

export const removeLinkThunk = linkId => async dispatch => {
  try {
    await axios.delete(`/api/links/${linkId}`)
    dispatch(removeLink(linkId))
  } catch (error) {
    throw error
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
          const newCollection = {...el, links: el.links}
          let links = newCollection.links
          const targetIndex = links.findIndex(li => li.id === action.targetId)
          const sourceIndex = links.findIndex(li => li.id === action.sourceId)
          targetId = links[targetIndex].id
          const temp = links[sourceIndex]
          links.splice(sourceIndex, 1)
          links.splice(targetIndex, 0, temp)
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
    case UPDATE_COLLECTION:
      return {
        ...state,
        selectedCollection: state.selectedCollection.map(collection => {
          if (collection.id === action.updatedCollection.id) {
            action.updatedCollection.links = collection.links
            return action.updatedCollection
          } else {
            return collection
          }
        })
      }
    case DELETE_COLLECTION:
      return {
        ...state,
        selectedCollection: state.selectedCollection.filter(collection => {
          return collection.id !== action.deletedCollection
        })
      }
    case CREATE_COLLECTION:
      return {
        ...state,
        selectedCollection: [...state.selectedCollection, action.newCollection]
      }
    case REMOVE_LINK: {
      const filteredLinks = state.selectedCollection.filter(
        link => link.id !== action.linkId
      )
      return {...state, selectedCollection: filteredLinks}
    }
    default:
      return state
  }
}
