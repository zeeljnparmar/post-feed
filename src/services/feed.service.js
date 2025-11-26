import {postsRepo} from '../repositories/post.repo.js';
import {engagementRepo} from '../repositories/engagement.repo.js';
import cache from '../cache/cache.service.js';
import { normalizeCursor } from '../utils/cursor.js';
import { formatReadableTimestamp } from '../utils/dateFormatter.js';


export async function getFeed({ cursor, limit = 10 }) {
  // Normalize cursor: if undefined -> +Infinity (fetch newest)
  const normCursor = normalizeCursor(cursor);
  const cacheKey = `feed:${normCursor}:${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // fetch all posts, sort desc
  let posts = await postsRepo.getAllPosts();
  posts.sort((a, b) => {
    if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
    return b.id.localeCompare(a.id);
  });

  // filter by cursor (timestamp < cursor) to avoid duplicates
  posts = posts.filter(p => p.timestamp < normCursor);

  const page = posts.slice(0, limit);

  // attach engagement counts for each post (counts only)
  const items = await Promise.all(page.map(async p => {
    const eng = await engagementRepo.getEngagementCounts(p.id);
    return {
      ...p,
      readableTimestamp: formatReadableTimestamp(p.timestamp),
      engagement: eng
    };
  }));

  const nextCursor = page.length === limit ? page[page.length - 1].timestamp : null;

  const result = {
    items,
    nextCursor
  };

  cache.set(cacheKey, result, 10 * 1000); // small TTL (10s) for example
  return result;
}

export const feedService = {
  getFeed
};
