import fs from 'fs/promises';
import { Mutex } from '../utils/fileMutex.js';

const DATA_PATH = new URL('../../data/posts.json', import.meta.url);
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

export async function addPost(post) {
  const posts = await readAll();
  posts.push(post);
  await writeAll(posts);
  return post;
}

export async function getAllPosts() {
  return await readAll();
}

export async function getPostById(id) {
  const posts = await readAll();
  return posts.find(p => p.id === id) || null;
}

export const postsRepo = {
  addPost,
  getAllPosts,
  getPostById
};
