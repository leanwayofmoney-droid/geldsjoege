import Link from "next/link";
import { getPosts } from "../lib/notion";
import { getTopFixes } from "../lib/ratings";

export default async function BlogTopFixes() {
  const posts = await getPosts();
  const top = await getTopFixes(posts, 5);

  if (top.length === 0) return null;

  return (
    <section className="pb-12">
      <p className="text-xs font-semibold tracking-widest uppercase mb-6"
        style={{ color: "#2C5A85", letterSpacing: "0.18em" }}>
        Meest gewaardeerd
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {top.map((fix, i) => (
          <Link
            key={fix.slug}
            href={`/blog/${fix.slug}`}
            className="group flex items-start gap-4 bg-white rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5"
            style={{
              border: "1px solid #E2E6EA",
              boxShadow: `inset 3px 0 0 ${fix.color || "#059669"}`,
            }}
          >
            <span className="text-xl font-bold shrink-0 leading-none mt-0.5"
              style={{ color: fix.color || "#059669", opacity: 0.4 }}>
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug group-hover:underline" style={{ color: "#1E2D3D" }}>
                {fix.title}
              </p>
              <p className="text-xs mt-1.5" style={{ color: "#F59E0B" }}>
                {"★".repeat(Math.round(fix.avg))}
                {"☆".repeat(5 - Math.round(fix.avg))}{" "}
                <span style={{ color: "#9BA8B5" }}>{fix.avg.toFixed(1)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
