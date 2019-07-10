import io from 'socket.io-client'
import store, {
  selectedCollectionThunk,
  moveLinks,
  getAllLinksThunk
} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('get_team', async teamId => {
  await store.dispatch(selectedCollectionThunk(teamId))
})

// socket.on('refresh_collection', async collectionId => {
//   await store.dispatch(getAllLinksThunk(collectionId))
// })

// socket.on(
//   'move_links',
//   async ({sourceId, targetId, collectionId} = updateOrder) => {
//     await store.dispatch(moveLinks(sourceId, targetId, collectionId))
//   }
// )

export default socket
