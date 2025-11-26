const fs = require('fs').promises;
const path = require('path');
const { Mutex } = require('../utils/fileMutex');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'posts.json');
const mutex = new Mutex();

async function readAll() {
  try {
    const txt = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeAll(posts) {
  await mutex.lock();
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), 'utf8');
  } finally {
    mutex.unlock();
  }
}

async function addPost(post) {
  const posts = await readAll();
  posts.push(post);
  await writeAll(posts);
  return post;
}

async function getAllPosts() {
  return await readAll();
}

async function getPostById(id) {
  const posts = await readAll();
  return posts.find(p => p.id === id) || null;
}

module.exports = {
  addPost,
  getAllPosts,
  getPostById
};
