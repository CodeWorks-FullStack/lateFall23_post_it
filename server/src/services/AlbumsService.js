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

    // REVIEW we aren't actually deleting the album from our database, so we aren't going to run the below code
    // const albumToDelete = await this.getAlbumById(albumId)
    // NOTE .remove() is no longer supported by mongoose, call .deleteOne() instead now 
    // await albumToDelete.deleteOne()
    // return `${albumToDelete.title} has been deleted`


    const albumToArchive = await this.getAlbumById(albumId)

    // NOTE flips bool
    albumToArchive.archived = !albumToArchive.archived

    // NOTE notifies database that we changed data
    await albumToArchive.save()

    return albumToArchive

  }

}

export const albumsService = new AlbumsService()