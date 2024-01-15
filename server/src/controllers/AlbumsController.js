import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {
  constructor () {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createAlbum)
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
}