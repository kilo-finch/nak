import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const initialState = {allTeams: []}
/**
 * ACTION TYPES
 */
const GOT_ALL_TEAMS = 'GOT_ALL_TEAMS'

/**
 * ACTION CREATORS
 */
const gotAllTeams = allTeams => ({
  type: GOT_ALL_TEAMS,
  allTeams
})

/**
 * THUNK CREATORS
 */
export const allTeamsThunk = () => async dispatch => {
  try {
    const res = await axios.get('api/teams')
    dispatch(gotAllTeams(res.data))
  } catch (error) {
    throw error
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_TEAMS:
      return {...state, allTeams: [...action.allTeams]}
    default:
      return state
  }
}
