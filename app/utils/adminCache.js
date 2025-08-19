// Simple in-memory cache for admin dashboard data
class AdminCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.CACHE_DURATION = 60000; // 1 minute cache
  }

  isValid(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  get(key) {
    if (this.isValid(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  set(key, data) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now());
  }

  invalidate(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }
}

// Create singleton instance
const adminCache = new AdminCache();

export default adminCache;
