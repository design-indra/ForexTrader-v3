import { LRUCache } from "lru-cache";

type RateLimiterOptions = { limit: number; windowMs: number };

export function rateLimiter({ limit, windowMs }: RateLimiterOptions) {
  const cache = new LRUCache<string, number[]>({ max: 500, ttl: windowMs });

  return async function check(ip: string): Promise<boolean> {
    const now = Date.now();
    const hits = (cache.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (hits.length >= limit) return false;
    hits.push(now);
    cache.set(ip, hits);
    return true;
  };
}
