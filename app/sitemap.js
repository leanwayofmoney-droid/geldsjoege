import { getPosts } from "../lib/notion";

const BASE = "https://geldsjoege.nl";

export default async function sitemap() {
  const posts = await getPosts();

  const staticPages = [
    { url: BASE,                                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/llms.txt`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/blog`,                          lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/besparen-voor-beginners`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/energie-besparen`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/abonnementen-opzeggen`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/over`,                          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
  ];

  const postPages = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: (() => {
      try {
        const d = new Date(post.date);
        return isNaN(d.getTime()) ? new Date() : d;
      } catch {
        return new Date();
      }
    })(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
