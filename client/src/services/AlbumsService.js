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

  async createAlbum(albumData){
    const response = await api.post('api/albums', albumData)
    logger.log('📡✨', response.data)
    const newAlbum = new Album(response.data)
    AppState.albums.push(newAlbum)
    return newAlbum
  }
}

export const albumsService = new AlbumsService()
