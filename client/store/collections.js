import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = {allCollections: []}
/**
 * ACTION TYPES
 */
const GOT_ALL_COLLECTIONS = 'GOT_ALL_COLLECTIONS'

/**
 * ACTION CREATORS
 */
const gotAllCollections = allCollections => ({
  type: GOT_ALL_COLLECTIONS,
  allCollections
})

/**
 * THUNK CREATORS
 */
export const allCollectionsThunk = () => async dispatch => {
  try {
    const res = await axios.get('api/collections')
    dispatch(gotAllCollections(res.data))
  } catch (error) {
    throw error
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_COLLECTIONS:
      return {...state, allCollections: [...action.allCollections]}
    default:
      return state
  }
}
