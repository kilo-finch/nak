import axios from 'axios'
import history from '../history'

//NEED TO CREATE THUNKS AND CHANGE THE REDUCER

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * ACTION TYPES
 */

const GET_LINKS_FROM_COLLECTION = 'GET_LINKS_FROM_COLLECTION'
const ADD_LINK = 'ADD_LINK'
const REMOVE_LINK = 'REMOVE_LINK'
const REMOVE_ALL_FROM_COLLECTION = 'REMOVE_ALL_FROM_COLLECTION'

/**
 * ACTION CREATORS
 */

const getLinks = collectionID => ({
  type: GET_LINKS_FROM_COLLECTION,
  collectionID
})

const addLink = link => ({
  type: ADD_LINK,
  link
})

const removeLink = link => ({
  type: REMOVE_LINK,
  link
})

const removeAllFromCollection = collectionID => ({
  type: REMOVE_ALL_FROM_COLLECTION,
  collectionID
})

/**
 * THUNK CREATORS
 */

//WRITE THESE WHEN BACKEND IS UP AND RUNNING

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
