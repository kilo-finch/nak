import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = {selectedCollection: []}
/**
 * ACTION TYPES
 */
const GOT_SELECTED_COLLECTION = 'GOT_SELECTED_COLLECTION'
const UPDATE_COLLECTION = 'UPDATE_COLLECTION'
const DELETE_COLLECTION = 'DELETE_COLLECTION'
const CREATE_COLLECTION = 'CREATE_COLLECTION'

/**
 * ACTION CREATORS
 */
const gotSelectedCollection = selectedCollection => ({
  type: GOT_SELECTED_COLLECTION,
  selectedCollection
})

const updateCollection = updatedCollection => ({
  type: UPDATE_COLLECTION,
  updatedCollection
})

const deleteCollection = deletedCollection => ({
  type: DELETE_COLLECTION,
  deletedCollection
})

const createdCollection = newCollection => ({
  type: CREATE_COLLECTION,
  newCollection
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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SELECTED_COLLECTION:
      return {...state, selectedCollection: [...action.selectedCollection]}
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
    default:
      return state
  }
}
