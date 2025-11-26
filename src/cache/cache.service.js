// Lightweight in-memory cache with TTL and small helper methods
class CacheService {
  constructor() {
    this.store = new Map();
    this.feedKeys = new Set(); // track feed keys for easy invalidation
  }

  _now() { return Date.now(); }

  set(key, value, ttl = 0) {
    const entry = {
      value,
      expiresAt: ttl > 0 ? this._now() + ttl : null
    };
    this.store.set(key, entry);
    if (key.startsWith('feed:')) this.feedKeys.add(key);
  }

  get(key) {
    const e = this.store.get(key);
    if (!e) return null;
    if (e.expiresAt && e.expiresAt < this._now()) {
      this.store.delete(key);
      if (key.startsWith('feed:')) this.feedKeys.delete(key);
      return null;
    }
    return e.value;
  }

  del(key) {
    this.store.delete(key);
    if (key.startsWith('feed:')) this.feedKeys.delete(key);
  }

  clearAllFeeds() {
    for (const k of Array.from(this.feedKeys)) {
      this.store.delete(k);
      this.feedKeys.delete(k);
    }
  }

  clearAll() {
    this.store.clear();
    this.feedKeys.clear();
  }
}

module.exports = new CacheService();
