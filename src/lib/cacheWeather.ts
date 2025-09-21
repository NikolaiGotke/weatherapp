const CACHE_KEY = "weatherCache";
const CACHE_TTL = 1000 * 60 * 10; // 10 min

interface CacheItem<T> {
  timestamp: number;
  data: T;
}

// Gem data
export function setCache<T>(city: string, data: T) {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  cache[city] = { timestamp: Date.now(), data };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

// Hent data hvis ikke for gammelt
export function getCache<T>(city: string): T | null {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  const item: CacheItem<T> = cache[city];
  if (item && Date.now() - item.timestamp < CACHE_TTL) {
    return item.data;
  }
  return null;
}
