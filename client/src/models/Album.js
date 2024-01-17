


export class Album{
  constructor(data){
    this.id = data.id
    this.title = data.title
    this.archived = data.archived
    this.category = data.category
    this.coverImg = data.coverImg
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.memberCount = data.memberCount
  }
}

