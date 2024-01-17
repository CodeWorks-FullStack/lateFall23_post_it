import { reactive } from 'vue'
import { Album } from './models/Album.js'
import { Picture } from './models/Picture.js'
import { Collaborator } from './models/Collaborator.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
 /** @type {Album[]} */
  albums: [],
/** @type {Album} */
  activeAlbum: null,
  /** @type {Picture[]} */
  pictures: [],
/** @type {Collaborator[]} */
  collaborators: [],

  /** @type {Collaborator[]} */
  accountCollaborators: []
})
