import Link from "next/link";
import NewsletterForm from "../components/NewsletterForm";
import ReceptCard from "../components/ReceptCard";
import FadeInUp from "../components/FadeInUp";
import ScrollIndicator from "../components/ScrollIndicator";
import HeroTop3 from "../components/HeroTop3";
import { getPosts } from "../lib/notion";
import { getTopFixes } from "../lib/ratings";

export const revalidate = 1800;

const CATEGORIES = [
  { label: "Boodschappen",  icon: "🛒", color: "#059669" },
  { label: "Energie",       icon: "⚡", color: "#D97706" },
  { label: "Abonnementen",  icon: "📱", color: "#2C5A85" },
  { label: "Verzekeringen", icon: "🛡️", color: "#7C3AED" },
  { label: "Belasting",     icon: "📊", color: "#DC2626" },
  { label: "Wonen",         icon: "🏠", color: "#C8813F" },
  { label: "Reizen",        icon: "✈️", color: "#0891B2" },
];

export default async function HomePage() {
  const posts = await getPosts();
  const recent = posts.slice(0, 4);

  const topRated = await getTopFixes(posts, 3);
  const top3Slugs = topRated.length >= 3 ? topRated.map((t) => t.slug) : [];
  const top3 = top3Slugs.length >= 3
    ? top3Slugs.map((s) => posts.find((p) => p.slug === s)).filter(Boolean)
    : posts.slice(0, 3);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <div className="grain hero-bg relative" style={{ borderBottom: "1px solid #E4EBE4" }}>

        {/* Decoratieve ringen — subtiele diepte rechtsboven */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: "-60px", right: "-80px", width: "520px", height: "520px", opacity: 0.045, zIndex: 0 }}
          viewBox="0 0 520 520" fill="none"
        >
          {[60,110,160,210,260].map((r, i) => (
            <circle key={i} cx="260" cy="260" r={r} stroke="#059669" strokeWidth="1" />
          ))}
          <circle cx="260" cy="260" r="12" fill="#059669" opacity="0.5" />
        </svg>

        {/* Gradient scheidingslijn onderaan hero */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C8E6C9 30%, #C8E6C9 70%, transparent)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <section className="relative pt-10 md:pt-14 pb-14 overflow-hidden">

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="hero-blob-1" />
              <div className="hero-blob-2" />
              <div className="hero-blob-3" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr,440px] gap-10 lg:gap-16 items-start">

              <div className="pt-4">
                <p className="eyebrow hero-animate mb-5">Slim én duurzaam besparen. Voor jezelf én het milieu.</p>
                <h1 className="hero-animate-d1 text-[2rem] sm:text-[2.4rem] md:text-[2.5rem] font-semibold mb-6"
                  style={{ color: "#1E2D3D", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
                  Bespaar{" "}
                  <span className="text-gradient">honderden euro&apos;s</span>
                  <br className="hidden sm:block" /> per jaar, stap voor stap
                </h1>

                <div className="hero-animate-d2 flex flex-wrap gap-2 mb-7">
                  {[
                    { label: "50+ Bespaartips", icon: "✦" },
                    { label: "Direct toepasbaar", icon: "○" },
                    { label: "Gem. €200 per tip", icon: "€" },
                  ].map((s) => (
                    <span key={s.label}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(5,150,105,0.1)",
                        color: "#059669",
                        border: "1px solid rgba(5,150,105,0.22)",
                      }}>
                      <span style={{ fontSize: "0.6rem" }}>{s.icon}</span>
                      {s.label}
                    </span>
                  ))}
                </div>

                <p className="hero-animate-d2 text-base md:text-lg leading-relaxed mb-9"
                  style={{ color: "#6C7B8B" }}>
                  Praktische{" "}
                  <strong style={{ color: "#059669", fontWeight: 600 }}>bespaartips</strong>{" "}
                  voor boodschappen, energie, abonnementen en meer. Bewuste keuzes die goed zijn voor je portemonnee én het milieu.
                </p>

                <div className="hero-animate-d3 flex flex-col sm:flex-row items-start gap-3">
                  <Link href="/blog"
                    className="inline-flex items-center justify-center text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                    style={{ backgroundColor: "#059669" }}
                    onMouseEnter={undefined}
                  >
                    Kies jouw eerste bespaartip
                  </Link>
                  <Link href="/#nieuwsbrief"
                    className="inline-flex items-center justify-center border text-sm font-medium px-6 py-3 rounded-full transition-colors hover:border-[#059669] hover:text-[#059669]"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#CDD3D9", color: "#6C7B8B" }}>
                    Elke week een bespaartip
                  </Link>
                </div>
              </div>

              <div className="hero-animate-d4">
                <HeroTop3 posts={top3} />
              </div>
            </div>

            <ScrollIndicator />
          </section>
        </div>
      </div> {/* einde hero-bg */}

      {/* ── Rest van de pagina ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Categorieën */}
        <FadeInUp>
          <section className="py-12">
            <p className="eyebrow mb-5">Verken per onderwerp</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  href={`/blog?cat=${encodeURIComponent(cat.label)}`}
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E6EA",
                    color: "#1E2D3D",
                    boxShadow: `inset 3px 0 0 ${cat.color}`,
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </section>
        </FadeInUp>

        {/* Nieuwste Bespaartips */}
        <section className="pb-20">
          <FadeInUp>
            <div className="flex items-center justify-between mb-8">
              <p className="eyebrow">Nieuwste Bespaartips</p>
              <Link href="/blog" className="text-sm transition-colors" style={{ color: "#6C7B8B" }}>
                Alle Bespaartips →
              </Link>
            </div>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recent.map((post, i) => (
              <FadeInUp key={post.slug} delay={i * 100}>
                <ReceptCard post={post} />
              </FadeInUp>
            ))}
          </div>
        </section>

        {/* Drie pijlers */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-20">
          {[
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
              label: "De Methode",
              desc: "Stap-voor-stap aanpak die je kunt volhouden. Geen quick fix, maar gewoonten voor de lange termijn.",
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              label: "De Berekening",
              desc: "Zie precies hoeveel jij per jaar bespaart. En wat het milieu oplevert.",
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
              label: "De Bespaar-Meter",
              desc: "Stel in hoe vaak je dit doet, zie jouw duurzame besparing per jaar.",
            },
          ].map((item, i) => (
            <FadeInUp key={item.label} delay={i * 120}>
              <div className="relative bg-white rounded-2xl p-6 overflow-hidden h-full"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E2E6EA" }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ backgroundColor: "#059669" }} />
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 mt-1"
                  style={{ backgroundColor: "rgba(5,150,105,0.1)", color: "#059669" }}>
                  {item.icon}
                </div>
                <p className="font-semibold mb-1 text-sm" style={{ color: "#1E2D3D" }}>{item.label}</p>
                <p className="text-sm leading-snug" style={{ color: "#6C7B8B" }}>{item.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </section>

        {/* Nieuwsbrief */}
        <FadeInUp>
          <section id="nieuwsbrief" className="pb-24">
            <NewsletterForm />
          </section>
        </FadeInUp>

      </div>
    </>
  );
}
