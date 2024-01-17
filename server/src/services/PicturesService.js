import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class PicturesService {
  async getPicturesInAlbum(albumId) {
    // NOTE js find equivalent: pictures.filter(picture => picture.albumId == albumId)
    // NOTE this is what's stored inside our parameter
    // const pictures = await dbContext.Pictures.find({ albumId: '65a6c1b3ccad28b46f482ee2' }).populate('creator', 'name picture')
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator', 'name picture')
    return pictures
  }
  async createPicture(pictureData) {
    const album = await albumsService.getAlbumById(pictureData.albumId)

    // REVIEW make sure the ablum is not archived before running code below if statement
    if (album.archived) {
      throw new BadRequest(`${album.title} has been archived, you can not post additional pictures to it`)
    }

    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }
}

export const picturesService = new PicturesService()