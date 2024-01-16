
import { AppState } from '../AppState.js'
import { Picture } from '../models/Picture.js'
import { logger } from '../utils/Logger.js'
import {api} from './AxiosService.js'

class PicturesService{
  async addPicture(pictureData){
    const response = await api.post('api/pictures', pictureData)
    console.log('📡💩', response.data)
    // NOTE if you service ends with just a log for response data, that means you are doing nothing with the response
    // NOTE make sure to change your AppState for REACTIVITY
    const newPicture = new Picture(response.data)
    AppState.pictures.push(newPicture)

  }

  async getAlbumPictures(albumId){
    AppState.pictures = [] // to clear the AppState set it back to it's starting value before the request
    const response = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('📡🏠', response.data)
    // NOTE make sure when you map, the model you are using is imported from your own models folder
    let pictures = response.data.map(picture => new Picture(picture))
    AppState.pictures = pictures
    // REVIEW JS has default classes, if you want to use a similar name, either create a two word class or be VERY careful and MAKE SURE it gets imported
    Date
    Image
    Comment
    Event
    Element
  }
}

export const picturesService = new PicturesService()
