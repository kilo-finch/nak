import io from 'socket.io-client'
import store, {
  selectedCollectionThunk,
  moveLinks,
  getAllLinksThunk,
  deleteTeamThunk,
  allTeamsThunk,
  getSingleTeam
} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('get_team', async teamId => {
  await store.dispatch(selectedCollectionThunk(teamId))
})

socket.on('get_single_team', teamId => {
  store.dispatch(getSingleTeam(teamId))
})

socket.on('delete_team', async teamId => {
  await store.dispatch(deleteTeamThunk(teamId))
})

socket.on('get_all_teams', async () => {
  await store.dispatch(allTeamsThunk())
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
