import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class AlbumsService {

  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')

    if (!album) {
      throw new BadRequest(`Invalid id: ${albumId}`)
    }
    return album
  }
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }

  async archiveAlbum(albumId) {

    // const albumToDelete = await this.getAlbumById(albumId)
    // NOTE .remove() is no longer supported by mongoose, call .deleteOne() instead now 
    // await albumToDelete.deleteOne()
    // return `${albumToDelete.title} has been deleted`


    const albumToArchive = await this.getAlbumById(albumId)

    albumToArchive.archived = !albumToArchive.archived

    await albumToArchive.save()

    return albumToArchive

  }

}

export const albumsService = new AlbumsService()