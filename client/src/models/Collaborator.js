import { Account } from "./Account.js"
import { Album } from "./Album.js"


export class Collaborator{
  constructor(data){
    this.id = data.id
    this.albumId = data.albumId
    this.accountId = data.accountId
    this.album = data.album ? new Album( data.album) : null // this is very trick to get right unless you have a very deep understanding of how your data works
    // this.album = data.album
    /** @type {Account} */
    this.profile =  data.profile // NOTE even though it is a better practice to type data, you can often run into issues with typing nested data, so it's sometimes better not too.
    this.createdAt = new Date(data.createdAt)
  }
}
