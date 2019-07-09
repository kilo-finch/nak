import io from 'socket.io-client'
import store from './store'
import {selectedCollectionThunk} from './store/collections'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('team_collection_adjusted', teamId => {
  store.dispatch(selectedCollectionThunk(teamId))
})
export default socket
