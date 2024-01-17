import { AppState } from "../AppState.js"
import { Collaborator } from "../models/Collaborator.js"
import { logger } from "../utils/Logger.js"
import { accountService } from "./AccountService.js"
import { api } from "./AxiosService.js"



class CollaboratorsService{
  async createCollaborator(collabData){
    const response = await api.post('api/collaborators', collabData)
    logger.log('✨🧑‍🤝‍🧑', response.data)
    const newCollaborator = new Collaborator(response.data)
    AppState.collaborators.push(newCollaborator)
    // NOTE either push into account array too, or
    // await collaboratorsService.getAccountCollaborators()
    AppState.accountCollaborators.push(newCollaborator)
  }

  async getAlbumCollaborators(albumId){
    const response = await api.get(`api/albums/${albumId}/collaborators`)
    logger.log('📡🧑‍🤝‍🧑', response.data)
    let collaborators = response.data.map(collab => new Collaborator(collab))
    AppState.collaborators = collaborators
  }

  async getAccountCollaborators(){
    const response = await api.get('account/collaborators')
    logger.log('🙅‍♂️🧑‍🤝‍🧑', response.data)
    let collaborators = response.data.map(collab => new Collaborator(collab))
    AppState.accountCollaborators = collaborators
  }

  async deleteCollaboration(collabId){
    const response = await api.delete(`api/collaborators/${collabId}`)
    logger.log('❌🧑‍🤝‍🧑', response.data)
    const indexToRemove = AppState.accountCollaborators.findIndex(collab => collab.id == collabId)
    if(indexToRemove > -1){
      AppState.accountCollaborators.splice(indexToRemove, 1)
    }
  }
}

export const collaboratorsService = new CollaboratorsService()
