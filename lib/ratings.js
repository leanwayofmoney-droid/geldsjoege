import Redis from "ioredis";

let client;
function getClient() {
  if (!process.env.REDIS_URL) return null;
  if (!client) client = new Redis(process.env.REDIS_URL, { lazyConnect: true, maxRetriesPerRequest: 1 });
  return client;
}

export async function getRating(slug) {
  try {
    const redis = getClient();
    if (!redis) return { avg: 0, count: 0 };
    const data = await redis.hgetall(`rating:${slug}`);
    const total = Number(data?.total || 0);
    const count = Number(data?.count || 0);
    const avg = count > 0 ? Math.round((total / count) * 10) / 10 : 0;
    return { avg, count };
  } catch { return { avg: 0, count: 0 }; }
}

export async function addRating(slug, stars) {
  const redis = getClient();
  if (!redis) throw new Error("Redis niet beschikbaar");
  const newTotal = await redis.hincrby(`rating:${slug}`, "total", stars);
  const newCount = await redis.hincrby(`rating:${slug}`, "count", 1);
  const avg = Math.round((newTotal / newCount) * 10) / 10;
  return { avg, count: newCount };
}

export async function getTopFixes(posts, limit = 5) {
  try {
    const redis = getClient();
    if (!redis) return [];
    const rated = await Promise.all(
      posts.map(async (p) => {
        const { avg, count } = await getRating(p.slug);
        return { slug: p.slug, title: p.title, color: p.color, avg, count };
      })
    );
    return rated
      .filter((p) => p.count > 0)
      .sort((a, b) => b.avg - a.avg || b.count - a.count)
      .slice(0, limit);
  } catch { return []; }
}
