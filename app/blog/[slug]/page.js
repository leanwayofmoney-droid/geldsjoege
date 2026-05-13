import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "../../../lib/notion";
import NewsletterForm from "../../../components/NewsletterForm";
import BespaarSlider from "../../../components/BespaarSlider";
import ReceptCard from "../../../components/ReceptCard";
import Sidebar from "../../../components/Sidebar";
import StarRating from "../../../components/StarRating";
import SidebarTopFixes from "../../../components/SidebarTopFixes";
import ReadingProgress from "../../../components/ReadingProgress";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

const BASE = "https://geldsjoege.nl";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${BASE}/blog/${post.slug}`;

  const metaDesc = post.excerpt
    ? `${post.excerpt.replace(/\.$/, "")}. Bespaar €${post.savingsPerTask} ${post.frequentieLabel}. Inclusief stap-voor-stap aanpak.`.slice(0, 155)
    : `Leer hoe je ${post.title.toLowerCase()} bespaart. €${post.savingsPerTask} ${post.frequentieLabel} goedkoper. Direct toepasbaar.`.slice(0, 155);

  const baseTitle = post.title;
  const titleWithSavings = `${baseTitle} (€${post.savingsPerTask} bespaard)`;
  const metaTitle = titleWithSavings.length <= 60 ? titleWithSavings : baseTitle;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [post.tool, post.categorie, "bespaartip", "besparen", "geldsjoege"].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: metaTitle,
      description: metaDesc,
      publishedTime: post.date,
      authors: [`${BASE}/over`],
      images: [{ url: post.image, width: 800, height: 533, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [post.image],
    },
  };
}

function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "#1E2D3D" }}>{part}</strong>
    ) : (
      part
    )
  );
}

function renderParagraphs(text, color = "#4A5568") {
  return text.split("\n\n").map((para, i) => (
    <p key={i} className="text-base leading-relaxed mb-4 last:mb-0" style={{ color }}>
      {renderBold(para)}
    </p>
  ));
}

// Rendert tekst met optionele TABEL: blokken
// Formaat: TABEL:\nKop1||Kop2||Kop3\nRij1||Rij2||Rij3
function renderContent(text, color = "#4A5568") {
  const blocks = text.split("\n\n");
  return blocks.map((block, i) => {
    if (block.startsWith("LIJST:")) {
      const items = block.replace("LIJST:", "").trim().split("\n").filter(Boolean);
      return (
        <ul key={i} className="space-y-2 my-3">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color === "#4A5568" ? "#EF4444" : color }} />
              <span className="text-sm leading-relaxed" style={{ color }}>{renderBold(item)}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith("TABEL:")) {
      const rows = block.replace("TABEL:", "").trim().split("\n").filter(Boolean);
      const headers = rows[0].split("||").map((h) => h.trim());
      const dataRows = rows.slice(1);
      return (
        <div key={i} className="overflow-x-auto my-4 rounded-xl" style={{ border: "1px solid #E2E6EA" }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#1E2D3D" }}>
                {headers.map((h, j) => (
                  <th key={j} className="px-4 py-3 text-left font-semibold" style={{ color: "#9BBCD8" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => {
                const cells = row.split("||").map((c) => c.trim());
                const isLast = ri === dataRows.length - 1;
                return (
                  <tr key={ri} style={{
                    backgroundColor: isLast ? "rgba(5,150,105,0.06)" : ri % 2 === 0 ? "#FFFFFF" : "#F8F9FA",
                    borderTop: "1px solid #E2E6EA",
                    fontWeight: isLast ? 600 : 400,
                  }}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3" style={{ color: isLast && ci > 0 ? "#059669" : "#1E2D3D" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <p key={i} className="text-base leading-relaxed mb-4 last:mb-0" style={{ color }}>
        {renderBold(block)}
      </p>
    );
  });
}

const PILLAR_MAP = {
  "Boodschappen":  { href: "/besparen-voor-beginners", title: "Besparen voor beginners", desc: "De eerste stappen naar structureel minder uitgeven." },
  "Energie":       { href: "/energie-besparen",        title: "Energie besparen",        desc: "Alles over gas, licht en slimme meters." },
  "Abonnementen":  { href: "/abonnementen-opzeggen",   title: "Abonnementen opzeggen",   desc: "Stop met betalen voor wat je niet gebruikt." },
  "Verzekeringen": { href: "/besparen-voor-beginners", title: "Besparen voor beginners", desc: "De eerste stappen naar structureel minder uitgeven." },
  "Belasting":     { href: "/besparen-voor-beginners", title: "Besparen voor beginners", desc: "De eerste stappen naar structureel minder uitgeven." },
  "Wonen":         { href: "/besparen-voor-beginners", title: "Besparen voor beginners", desc: "De eerste stappen naar structureel minder uitgeven." },
  "Reizen":        { href: "/besparen-voor-beginners", title: "Besparen voor beginners", desc: "De eerste stappen naar structureel minder uitgeven." },
};

export default async function BespaartipPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getPosts();

  const sameCat  = allPosts.filter((p) => p.slug !== post.slug && p.categorie === post.categorie);
  const otherCat = allPosts.filter((p) => p.slug !== post.slug && p.categorie !== post.categorie);
  const related  = [...sameCat, ...otherCat].slice(0, 3);

  const pillar = PILLAR_MAP[post.categorie] || null;
  const c = post.color || "#059669";

  const stappen = post.stapVoorStap
    ? post.stapVoorStap.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const variaties = post.variaties
    ? post.variaties.split("\n").map((r) => {
        const [titel, beschrijving] = r.split("||").map((s) => s.trim());
        return titel && beschrijving ? { titel, beschrijving } : null;
      }).filter(Boolean)
    : [];

  const faqItems = post.faq
    ? post.faq.split(/\n\s*\n/).map((blok) => {
        const qMatch = blok.match(/^Q:\s*(.+)/m);
        const aMatch = blok.match(/^A:\s*(.+)/ms);
        return qMatch && aMatch ? { q: qMatch[1].trim(), a: aMatch[1].trim() } : null;
      }).filter(Boolean)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-6">
      <ReadingProgress color={c} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">

        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      { "@type": "ListItem", position: 1, name: "Home",       item: BASE },
                      { "@type": "ListItem", position: 2, name: "Bespaartips",  item: `${BASE}/blog` },
                      { "@type": "ListItem", position: 3, name: post.title,   item: `${BASE}/blog/${post.slug}` },
                    ],
                  },
                  {
                    "@type": "HowTo",
                    name: post.title,
                    description: post.excerpt,
                    image: post.image,
                    datePublished: post.date,
                    inLanguage: "nl",
                    author: { "@type": "Person", name: "Stefan", url: `${BASE}/over` },
                    publisher: { "@type": "Organization", name: "Geld Sjoege", url: BASE },
                    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
                    supply: [{ "@type": "HowToSupply", name: post.tool }],
                    step: [
                      { "@type": "HowToStep", name: "Begrijp de aanpak",   text: post.persoonlijkeMissie?.replace(/\*\*/g, "") },
                      { "@type": "HowToStep", name: "Het verschil",        text: post.transformatie?.replace(/\*\*/g, "") },
                      { "@type": "HowToStep", name: "De aanpak",           text: post.strategischeLogica?.replace(/\*\*/g, "") },
                    ],
                  },
                ],
              }),
            }}
          />

          <div className="pt-10 pb-8">
            <Link href="/blog" className="text-sm inline-flex items-center gap-1 transition-colors" style={{ color: "#9BA8B5" }}>
              ← Terug naar Bespaartips
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: "260px" }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 660px"
            />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, rgba(30,45,61,0.7) 0%, transparent 60%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${c}30`, color: "#FFFFFF", backdropFilter: "blur(6px)", border: `1px solid ${c}50` }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bespaart €{post.savingsPerTask} {post.frequentieLabel}
              </span>
            </div>
          </div>

          <header className="pb-10" style={{ borderBottom: "1px solid #E2E6EA" }}>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4" style={{ color: "#1E2D3D" }}>
              {post.title}
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#6C7B8B" }}>
              {post.excerpt}
            </p>

            <div className="rounded-xl overflow-hidden mb-5" style={{ border: "1px solid #E2E6EA" }}>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Methode",   value: post.tool },
                    { label: "Besparing", value: `€${post.savingsPerTask} ${post.frequentieLabel}` },
                    { label: "Niveau",    value: post.niveau },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 2 ? "1px solid #E2E6EA" : "none" }}>
                      <td className="px-4 py-3 font-medium w-32" style={{ color: "#9BA8B5", backgroundColor: "#F8F9FA" }}>
                        {row.label}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#1E2D3D" }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3 text-xs" style={{ color: "#9BA8B5" }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} lezen</span>
            </div>
          </header>

          {/* Blok 1: De kern */}
          <section className="pt-10 pb-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: c, letterSpacing: "0.16em" }}>De kern</p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight" style={{ color: "#1E2D3D" }}>
              {post.curiosityHeader}
            </h2>
          </section>

          {/* Blok 2: Mijn ontdekking */}
          <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: c, letterSpacing: "0.16em" }}>Mijn ontdekking</p>
            <div className="text-base leading-relaxed" style={{ color: "#4A5568" }}>
              {renderBold(post.persoonlijkeMissie)}
            </div>
          </section>

          {/* Blok 3: Het verschil */}
          <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: c, letterSpacing: "0.16em" }}>Het verschil</p>
            <div className="rounded-xl p-5 space-y-4"
              style={{ backgroundColor: "#F0F4F8", border: "1px solid #E2E6EA", borderLeft: `3px solid ${c}` }}>
              {renderContent(post.transformatie, "#1E2D3D")}
            </div>
          </section>

          {/* Blok 4: De aanpak */}
          <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: c, letterSpacing: "0.16em" }}>De aanpak</p>
            <div className="space-y-1">
              {renderParagraphs(post.strategischeLogica, "#4A5568")}
            </div>
          </section>

          {/* Blok 4b: Zo doe je het */}
          {stappen.length > 0 && (
            <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-6"
                style={{ color: c, letterSpacing: "0.16em" }}>Zo doe je het</p>
              <ol className="space-y-4">
                {stappen.map((stap, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${c}18`, color: c }}>
                      {i + 1}
                    </span>
                    <p className="text-base leading-relaxed pt-0.5" style={{ color: "#4A5568" }}>
                      {renderBold(stap)}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Blok 4c: Slimme variaties */}
          {variaties.length > 0 && (
            <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-6"
                style={{ color: c, letterSpacing: "0.16em" }}>Slimme variaties</p>
              <div className="space-y-3">
                {variaties.map((v, i) => (
                  <div key={i} className="rounded-xl p-4"
                    style={{ border: "1px solid #E2E6EA", borderLeft: `3px solid ${c}`, backgroundColor: "#FFFFFF" }}>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1E2D3D" }}>{v.titel}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6C7B8B" }}>{renderBold(v.beschrijving)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* De Checklist */}
          <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: c, letterSpacing: "0.16em" }}>De Checklist</p>
            <div className="grain rounded-xl p-6 overflow-hidden" style={{ backgroundColor: "#1E2D3D" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "#6EE7B7" }}>Concrete actiepunten</p>
              <p className="text-base font-semibold mb-4" style={{ color: "#FFFFFF" }}>
                Klaar om direct te beginnen
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#9BA8B5" }}>
                De volledige bespaarchecklist voor dit onderwerp staat in onze nieuwsbrief, inclusief de exacte stappen,
                varianten en tips voor maximale besparing. Schrijf je in en ontvang hem direct.
              </p>
              <a href="#nieuwsbrief"
                className="pulse inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                style={{ backgroundColor: "#059669", color: "#FFFFFF" }}>
                Ontvang De Checklist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>

          {/* Blok 5: Wanneer werkt dit niet */}
          <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
            <div className="flex gap-4 rounded-xl p-5"
              style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="#EF4444" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "#EF4444", letterSpacing: "0.12em" }}>Wanneer werkt dit niet</p>
                <div className="text-sm" style={{ color: "#4A5568" }}>
                  {renderContent(post.nuance, "#4A5568")}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          {faqItems.length > 0 && (
            <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqItems.map((item) => ({
                      "@type": "Question",
                      name: item.q,
                      acceptedAnswer: { "@type": "Answer", text: item.a },
                    })),
                  }),
                }}
              />
              <p className="text-xs font-semibold tracking-widest uppercase mb-6"
                style={{ color: c, letterSpacing: "0.16em" }}>Veelgestelde vragen</p>
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ border: "1px solid #E2E6EA", backgroundColor: "#FFFFFF" }}>
                    <p className="font-semibold text-sm mb-2" style={{ color: "#1E2D3D" }}>{item.q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6C7B8B" }}>{renderBold(item.a)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Blok 6: Impact CTA + BespaarSlider */}
          <section style={{ borderTop: "1px solid #E2E6EA" }}>
            <div className="pt-8 pb-2">
              <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>
                {renderBold(post.impactCTA)}
              </p>
            </div>
            <BespaarSlider
              savingsPerTask={post.savingsPerTask}
              frequentieLabel={post.frequentieLabel}
              savingsEuroLabel={post.savingsEuroLabel}
            />
          </section>

        </article>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-8 pt-10">
            <Sidebar slug={post.slug} />
          </div>
        </div>

        <div className="lg:hidden mt-6 space-y-4">
          <StarRating slug={post.slug} />
          <SidebarTopFixes />
        </div>

      </div>

      {/* Meer Bespaartips */}
      <section className="py-16" style={{ borderTop: "1px solid #E2E6EA" }}>
        <div className="flex items-center justify-between mb-8">
          <p className="eyebrow">{post.categorie ? `Meer in ${post.categorie}` : "Meer Bespaartips"}</p>
          {post.categorie && (
            <Link href={`/blog?cat=${encodeURIComponent(post.categorie)}`}
              className="text-sm transition-colors hover:underline" style={{ color: "#6C7B8B" }}>
              Alle {post.categorie}-fixes →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((p) => <ReceptCard key={p.slug} post={p} />)}
        </div>

        {pillar && (
          <div className="mt-8">
            <Link href={pillar.href}
              className="group flex items-center justify-between rounded-xl p-5 transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E6EA", boxShadow: "inset 4px 0 0 #059669" }}>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#059669", letterSpacing: "0.16em" }}>Volgende stap</p>
                <p className="font-semibold text-sm mb-0.5" style={{ color: "#1E2D3D" }}>{pillar.title}</p>
                <p className="text-xs" style={{ color: "#6C7B8B" }}>{pillar.desc}</p>
              </div>
              <svg className="w-5 h-5 flex-shrink-0 ml-4 transition-transform group-hover:translate-x-1"
                fill="none" stroke="#059669" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      <section id="nieuwsbrief" className="pb-24">
        <NewsletterForm />
      </section>

    </div>
  );
}
