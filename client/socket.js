import io from 'socket.io-client'
import store from './store'
import {selectedCollectionThunk, updateCollectionThunk} from './store/'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('get_team', teamId => {
  store.dispatch(selectedCollectionThunk(teamId))
})
export default socket

socket.on('get_collection', collectionId => {
  store.dispatch(updateCollectionThunk(collectionId))
})
