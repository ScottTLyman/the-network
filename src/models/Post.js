export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl || ''
    this.likes = data.likeIds || []
    this.name = data.creator.name
    this.creatorImg = data.creator.picture
  }
}