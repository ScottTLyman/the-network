import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    logger.log('got all posts', res.data.posts)
    AppState.posts = res.data.posts
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.older = res.data.older ? res.data.older.slice(-1) : null
    AppState.newer = res.data.newer ? res.data.newer.slice(-1) : null
  }
  async createPost(editable) {
    const res = await api.post('api/posts', editable)
    logger.log('post data', res.data)
    AppState.posts.push(new Post(res.data))
  }
  async updateLike(id) {
    const res = await api.post('api/posts/' + id + '/like')
    logger.log('update like', res.data)
    // AppState.posts.filter(p => p.id == id).likes = res.data.likes
    this.getAll()
  }
  async getPostsByProfileId(id) {
    const res = await api.get('api/profiles/' + id + '/posts')
    logger.log('profile posts', res.data)
    AppState.posts = res.data.posts
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.older = res.data.older ? res.data.older.slice(-1) : null
    AppState.newer = res.data.newer ? res.data.newer.slice(-1) : null
  }
  setActive(post) {
    AppState.activePost = post
  }
  async getOlder() {
    const res = await api.get('api/posts?page=' + AppState.older)
    AppState.posts = res.data.posts
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.older = res.data.older ? res.data.older.slice(-1) : null
    AppState.newer = res.data.newer ? res.data.newer.slice(-1) : null
  }
  async getNewer() {
    const res = await api.get('api/posts?page=' + AppState.newer)
    AppState.posts = res.data.posts
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.older = res.data.older ? res.data.older.slice(-1) : null
    AppState.newer = res.data.newer ? res.data.newer.slice(-1) : null
  }
  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log('delete post', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }
}

export const postsService = new PostsService()