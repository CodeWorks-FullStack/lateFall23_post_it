import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class AlbumsService{
  async getAllAlbums(){
    const response = await api.get('api/albums')
    logger.log('📡📔', response.data)
    AppState.albums = response.data.map(album => new Album(album))
  }

  async getGetAlbumById(albumId){
    AppState.activeAlbum = null
    const response = await api.get(`api/albums/${albumId}`)
    logger.log('📡🚵‍♀️', response.data)
    AppState.activeAlbum = new Album(response.data)
  }
}

export const albumsService = new AlbumsService()
