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

/**
 * ACTION CREATORS
 */
const gotSelectedCollection = selectedCollection => ({
  type: GOT_SELECTED_COLLECTION,
  selectedCollection
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
  collectionId,
  teamId
) => async dispatch => {
  try {
    const res = await axios.put(`api/collections/${collectionId}`, {
      collectionName
    })
    dispatch(selectedCollectionThunk(teamId))
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
    default:
      return state
  }
}
