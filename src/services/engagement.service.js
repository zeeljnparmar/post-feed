import {engagementRepo} from '../repositories/engagement.repo.js'
import {postsRepo} from '../repositories/post.repo.js'
import {cache} from '../cache/cache.service.js'

export async function like(postId, userId) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const changed = await engagementRepo.addLike(postId, userId);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return { postId, liked: changed };
}

export async function unlike(postId, userId) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const changed = await engagementRepo.removeLike(postId, userId);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return { postId, liked: !changed ? false : true };
}

export async function comment(postId, userId, text) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const comment = await engagementRepo.addComment(postId, userId, text);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return comment;
}

export async function share(postId, userId) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const count = await engagementRepo.incrementShare(postId);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return { postId, shareCount: count };
}

export const engagementService={
  like,
  unlike,
  comment,
  share
};
