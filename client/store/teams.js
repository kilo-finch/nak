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
const DELETE_TEAM = 'DELETE_TEAM'
const UPDATE_TEAM = 'UPDATE_TEAM'
const CREATE_TEAM = 'CREATE_TEAM'
const ADD_USER_TO_TEAM = 'ADD_USER_TO_TEAM'

/**
 * ACTION CREATORS
 */

const gotAllTeams = allTeams => ({
  type: GOT_ALL_TEAMS,
  allTeams
})

const createTeam = team => ({
  type: CREATE_TEAM,
  team
})

const deleteTeam = teamId => ({
  type: DELETE_TEAM,
  teamId
})

const updateTeam = (teamId, team) => ({
  type: UPDATE_TEAM,
  teamId,
  team
})

const addUserToTeam = (teamId, userEmail) => ({
  type: ADD_USER_TO_TEAM,
  teamId,
  userEmail
})

/**
 * THUNK CREATORS
 */

export const allTeamsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/teams')
    dispatch(gotAllTeams(res.data))
  } catch (error) {
    throw error
  }
}

export const createTeamThunk = team => async dispatch => {
  try {
    const res = await axios.post('/api/teams', team)
    dispatch(createTeam(res.data))
  } catch (error) {
    throw error
  }
}

export const deleteTeamThunk = teamId => async dispatch => {
  try {
    await axios.delete(`/api/teams/${teamId}`)
    dispatch(deleteTeam(teamId))
  } catch (error) {
    throw error
  }
}

export const updateTeamThunk = (teamId, team) => async dispatch => {
  try {
    const res = await axios.put(`/api/teams/${teamId}`, team)
    dispatch(updateTeam(res.data))
  } catch (error) {
    throw error
  }
}

export const addUserToTeamThunk = (teamId, userEmail) => async dispatch => {
  try {
    const res = await axios.put(`/api/teams/${teamId}`, userEmail)
    dispatch(addUserToTeam(res.data))
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
    case CREATE_TEAM:
      return {...state, allTeams: [...state.allTeams, action.team]}
    case DELETE_TEAM: {
      const filteredTeams = state.allTeams.filter(
        team => team.id !== action.teamId
      )
      return {...state, allTeams: filteredTeams}
    }
    case UPDATE_TEAM: {
      const updatedAllTeams = state.allTeams.map(team => {
        if (team.id === action.updatedTeam.id) {
          return action.updateTeam
        } else {
          return team
        }
      })
      return {...state, allTeams: updatedAllTeams}
    }
    default:
      return state
  }
}
