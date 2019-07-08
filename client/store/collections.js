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
const CREATE_COLLECTION = 'CREATE_COLLECTION'

/**
 * ACTION CREATORS
 */
const gotSelectedCollection = selectedCollection => ({
  type: GOT_SELECTED_COLLECTION,
  selectedCollection
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

export const createCollection = (name, teamId) => async dispatch => {
  try {
    const {data} = await axios.post(`api/collections/${teamId}`, {name})
    dispatch(createdCollection(data))
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
    case CREATE_COLLECTION:
      return {
        ...state,
        selectedCollection: [...state.selectedCollection, action.newCollection]
      }
    default:
      return state
  }
}
