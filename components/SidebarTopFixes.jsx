import Link from "next/link";
import { getPosts } from "../lib/notion";
import { getTopFixes } from "../lib/ratings";

export default async function SidebarTopFixes() {
  const posts = await getPosts();
  const top = await getTopFixes(posts, 5);

  return (
    <div className="rounded-xl p-5" style={{ border: "1px solid #E2E6EA", backgroundColor: "#FFFFFF" }}>
      <p className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: "#2C5A85", letterSpacing: "0.16em" }}>
        Top 5 Bespaartips
      </p>

      {top.length === 0 ? (
        <p className="text-xs leading-relaxed" style={{ color: "#9BA8B5" }}>
          Nog geen beoordelingen. Wees de eerste!
        </p>
      ) : (
        <ol className="space-y-3">
          {top.map((fix, i) => (
            <li key={fix.slug}>
              <Link href={`/blog/${fix.slug}`} className="flex items-start gap-3 group">
                <span className="text-xs font-bold mt-0.5 w-4 shrink-0" style={{ color: fix.color || "#059669" }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug group-hover:underline truncate" style={{ color: "#1E2D3D" }}>
                    {fix.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#F59E0B" }}>
                    {"★".repeat(Math.round(fix.avg))}
                    {"☆".repeat(5 - Math.round(fix.avg))}{" "}
                    <span style={{ color: "#9BA8B5" }}>{fix.avg.toFixed(1)}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
