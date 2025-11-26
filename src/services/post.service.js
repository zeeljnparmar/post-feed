const uuid = require('uuid').v4;
const postsRepo = require('../repositories/post.repo.js');
const engagementRepo = require('../repositories/engagement.repo.js');
const cache = require('../cache/cache.service');
const { formatReadableTimestamp } = require('../utils/dateFormatter');


async function createPost({ userId, content, media }) {
  const post = {
    id: uuid(),
    userId,
    content,
    media: Array.isArray(media) ? media : (media ? [media] : []),
    timestamp: Date.now()
  };
  await postsRepo.addPost(post);
  // initialize engagement entry
  await engagementRepo.initForPost(post.id);
  // invalidate feed caches
  cache.clearAllFeeds();
  return post;
}

async function getPostById(id) {
  const post = await postsRepo.getPostById(id);
  if (!post) return null;
  // attach engagement counts
  const engagement = await engagementRepo.getEngagementCounts(id);
  return {
    ...post,
    readableTimestamp: formatReadableTimestamp(post.timestamp),
    engagement
  };
}

module.exports = {
  createPost,
  getPostById
};
