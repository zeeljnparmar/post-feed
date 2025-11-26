const fs = require('fs').promises;
const path = require('path');
const { Mutex } = require('../utils/fileMutex');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'engagement.json');
const mutex = new Mutex();

async function readAll() {
  try {
    const txt = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(txt || '{}');
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

async function writeAll(data) {
  await mutex.lock();
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } finally {
    mutex.unlock();
  }
}

async function initForPost(postId) {
  const data = await readAll();
  if (!data[postId]) {
    data[postId] = {
      likes: [],
      comments: [],
      shareCount: 0
    };
    await writeAll(data);
  }
}

async function addLike(postId, userId) {
  const data = await readAll();
  if (!data[postId]) data[postId] = { likes: [], comments: [], shareCount: 0 };
  if (!data[postId].likes.includes(userId)) {
    data[postId].likes.push(userId);
    await writeAll(data);
    return true;
  }
  return false;
}

async function removeLike(postId, userId) {
  const data = await readAll();
  if (!data[postId]) return false;
  const idx = data[postId].likes.indexOf(userId);
  if (idx >= 0) {
    data[postId].likes.splice(idx, 1);
    await writeAll(data);
    return true;
  }
  return false;
}

async function addComment(postId, userId, text) {
  const data = await readAll();
  if (!data[postId]) data[postId] = { likes: [], comments: [], shareCount: 0 };
  const comment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId,
    text,
    timestamp: Date.now()
  };
  data[postId].comments.push(comment);
  await writeAll(data);
  return comment;
}

async function incrementShare(postId) {
  const data = await readAll();
  if (!data[postId]) data[postId] = { likes: [], comments: [], shareCount: 0 };
  data[postId].shareCount = (data[postId].shareCount || 0) + 1;
  await writeAll(data);
  return data[postId].shareCount;
}

async function getEngagementCounts(postId) {
  const data = await readAll();
  const entry = data[postId] || { likes: [], comments: [], shareCount: 0 };
  return {
    likeCount: entry.likes.length,
    shareCount: entry.shareCount || 0,
    commentCount: entry.comments
  };
}

async function getFullEngagement(postId) {
  const data = await readAll();
  return data[postId] || { likes: [], comments: [], shareCount: 0 };
}

module.exports = {
  initForPost,
  addLike,
  removeLike,
  addComment,
  incrementShare,
  getEngagementCounts,
  getFullEngagement
};
