import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CollaboratorsService {

  async getMyAlbumCollaborations(userId) {
    const albumCollaborations = await dbContext.Collaborators.find({ accountId: userId }).populate('album')

    // NOTE redundant data!
    // const albumCollaborations = await dbContext.Collaborators.find({ accountId: userId }).populate('album').populate('profile')

    return albumCollaborations
  }
  async getCollaboratorsForAlbum(albumId) {
    const collaborators = await dbContext.Collaborators.find({ albumId: albumId }).populate('profile', 'name picture')
    return collaborators
  }
  async createCollaborator(collaboratorData) {
    const collaborator = await dbContext.Collaborators.create(collaboratorData)
    await collaborator.populate('profile', 'name picture')
    return collaborator
  }

  async deleteCollaborator(collaboratorId) {
    const collaborator = await dbContext.Collaborators.findById(collaboratorId).populate('album')

    if (!collaborator) {
      throw new BadRequest(`Invalid id: ${collaboratorId}`)
    }

    await collaborator.deleteOne()

    // @ts-ignore
    return `No longer collaborating on ${collaborator.album.title}`
  }
}

export const collaboratorsService = new CollaboratorsService()