import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PicturesService.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";

export class AlbumsController extends BaseController {
  constructor () {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getAlbumById)
      .get('/:albumId/pictures', this.getPicturesInAlbum)
      .get('/:albumId/collaborators', this.getCollaboratorsForAlbum)

      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
  }

  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getPicturesInAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const pictures = await picturesService.getPicturesInAlbum(albumId)
      response.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getCollaboratorsForAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const collaborators = await collaboratorsService.getCollaboratorsForAlbum(albumId)
      response.send(collaborators)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(request, response, next) {
    try {
      const albumData = request.body
      const userId = request.userInfo.id
      albumData.creatorId = userId
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.archiveAlbum(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

}