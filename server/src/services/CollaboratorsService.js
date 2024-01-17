import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CollaboratorsService {

  async getMyAlbumCollaborations(userId) {
    // NOTE redundant data!
    // const albumCollaborations = await dbContext.Collaborators.find({ accountId: userId }).populate('album').populate('profile')

    // const albumCollaborations = await dbContext.Collaborators.find({ accountId: userId }).populate('album')

    // NOTE how to run populate on a nested schema
    // REVIEW might not need this for your checkpoint
    const albumCollaborations = await dbContext.Collaborators.find({ accountId: userId }).populate({
      path: 'album',
      populate: {
        path: 'memberCount'
      }
    })

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

  async deleteCollaborator(collaboratorId, userId) {
    const collaborator = await dbContext.Collaborators.findById(collaboratorId).populate('album')

    if (!collaborator) {
      throw new BadRequest(`Invalid id: ${collaboratorId}`)
    }

    if (collaborator.accountId != userId) {
      throw new Forbidden("OOPS, SOMEHTHING WENT WRONG 😉")
    }

    await collaborator.deleteOne()

    // @ts-ignore
    return `No longer collaborating on ${collaborator.album.title}`
  }
}

export const collaboratorsService = new CollaboratorsService()