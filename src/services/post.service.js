import { v4 as uuid } from 'uuid';
import {postsRepo} from '../repositories/post.repo.js';
import {engagementRepo} from '../repositories/engagement.repo.js';
import cache from '../cache/cache.service.js';
import { formatReadableTimestamp } from '../utils/dateFormatter.js';
import {errorResponse} from '../utils/error.js'


export async function createPost({ userId, content, media }) {
  const post = {
    id: uuid(),
    userId,
    content,
    media: Array.isArray(media) ? media : (media ? [media] : []),
    timestamp: Date.now()
  };
  try {
      await postsRepo.addPost(post);
      // initialize engagement entry
      await engagementRepo.initForPost(post.id);
      // invalidate feed caches
      cache.clearAllFeeds();
      return post;
  } catch (error) {  
    console.log(error)
    return errorResponse 
  }
}

export async function getPostById(id) {
  try{
    const post = await postsRepo.getPostById(id);
    if (!post) return null;
    // attach engagement counts
    const engagement = await engagementRepo.getEngagementCounts(id);
    return {
      ...post,
      readableTimestamp: formatReadableTimestamp(post.timestamp),
      engagement
    };
  }catch{
     return errorResponse 
  }
}

export const postService ={
  createPost,
  getPostById
};
