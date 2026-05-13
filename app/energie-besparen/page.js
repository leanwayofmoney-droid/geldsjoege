import Link from "next/link";
import ReceptCard from "../../components/ReceptCard";
import NewsletterForm from "../../components/NewsletterForm";
import { getPosts } from "../../lib/notion";

const BASE = "https://geldsjoege.nl";

export const metadata = {
  title: "Energie besparen in 2026: gas, licht en slimme meters",
  description: "Praktische tips om te besparen op gas en elektriciteit. Van je thermostaat instellen tot je contract vergelijken. Alles stap voor stap uitgelegd.",
  alternates: { canonical: `${BASE}/energie-besparen` },
  openGraph: {
    type: "article",
    url: `${BASE}/energie-besparen`,
    title: "Energie besparen: gas, licht en slimme meters",
    description: "Bespaar op gas en elektriciteit zonder in te leveren op comfort.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Energie besparen in 2026: gas, licht en slimme meters",
  description: "Praktische tips om te besparen op gas en elektriciteit.",
  author: { "@type": "Organization", name: "Geld Sjoege" },
  publisher: { "@type": "Organization", name: "Geld Sjoege", url: BASE },
  url: `${BASE}/energie-besparen`,
  inLanguage: "nl-NL",
};

export const revalidate = 3600;

export default async function EnergieBesparenPage() {
  const posts = await getPosts();
  const gerelateerd = posts
    .filter((p) => p.categorie === "Energie")
    .slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-2xl">

        <section className="pt-20 pb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#D97706", letterSpacing: "0.18em" }}>
            Energie besparen
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-5 leading-tight" style={{ color: "#1E2D3D" }}>
            Minder betalen voor gas en licht
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#6C7B8B" }}>
            Energie is voor de meeste huishoudens de grootste vaste last na huur of hypotheek.
            Een paar slimme keuzes kunnen €200–400 per jaar schelen, zonder dat je het dagelijks merkt.
          </p>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>
            Waarom betalen we te veel voor energie?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
            <p>
              De meeste mensen zitten jarenlang op hetzelfde contract, terwijl er goedkopere opties zijn.
              Energieleveranciers rekenen op de luiheid van hun klanten. Overstappen duurt 15 minuten
              en kan honderden euro&apos;s schelen.
            </p>
            <p>
              Daarnaast zijn er kleine aanpassingen aan je thermostaat, je apparaten en je gewoonten
              die samen optellen tot een merkbaar lagere rekening.
            </p>
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-5" style={{ color: "#1E2D3D" }}>
            De grootste energiebesparingen op een rij
          </h2>
          <div className="space-y-3">
            {[
              { nr: "01", titel: "Energiecontract vergelijken", tekst: "Gebruik een vergelijkingssite en stap over naar een goedkopere aanbieder. Eenmalige actie, structurele besparing.", besparing: "€150–250/jaar" },
              { nr: "02", titel: "Thermostaat slim instellen", tekst: "1 graad lager = 6% lager gasverbruik. Een slim thermostaat doet dit automatisch.", besparing: "€80–120/jaar" },
              { nr: "03", titel: "Standby-verbruik uitschakelen", tekst: "TV, opladers, spelcomputers. Op stand-by verbruiken ze continu stroom. Stekkerblok met schakelaar lost het op.", besparing: "€30–60/jaar" },
              { nr: "04", titel: "LED-verlichting", tekst: "LED verbruikt 80% minder dan gloeilampen. Aanschaf verdien je terug in 1–2 jaar.", besparing: "€40–80/jaar" },
              { nr: "05", titel: "Douche korter of kouder", tekst: "2 minuten minder douchen bespaart gemiddeld €60 per jaar per persoon.", besparing: "€60–120/jaar" },
            ].map((item) => (
              <div key={item.nr} className="rounded-xl p-4"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E6EA", borderLeft: "3px solid #D97706" }}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex gap-3">
                    <span className="text-sm font-bold shrink-0 mt-0.5" style={{ color: "rgba(44,90,133,0.3)" }}>{item.nr}</span>
                    <p className="font-semibold text-sm" style={{ color: "#1E2D3D" }}>{item.titel}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: "rgba(5,150,105,0.1)", color: "#059669" }}>
                    {item.besparing}
                  </span>
                </div>
                <p className="text-sm leading-relaxed pl-7" style={{ color: "#6C7B8B" }}>{item.tekst}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>
            Slimme meter: voordeel of nadeel?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
            <p>
              Een slimme meter geeft je inzicht in je verbruik per uur. Daarmee zie je wanneer je veel verbruikt
              en kun je dat aanpassen. Veel energieleveranciers bieden dynamische tarieven aan: goedkoper stroom
              laden in de nacht, duurder overdag.
            </p>
            <p>
              Heb je een slimme meter? Kijk dan of je dynamisch tarief interessant is. Heb je zonnepanelen of een
              elektrische auto? Dan kan dit €100–300 per jaar extra schelen.
            </p>
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>Andere onderwerpen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titel: "Besparen voor beginners", href: "/besparen-voor-beginners", kleur: "#059669", desc: "De eerste stappen naar structureel minder uitgeven." },
              { titel: "Abonnementen opzeggen", href: "/abonnementen-opzeggen", kleur: "#2C5A85", desc: "Stop met betalen voor wat je niet gebruikt." },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="group rounded-xl p-4 transition-all hover:-translate-y-0.5"
                style={{ border: "1px solid #E2E6EA", boxShadow: `inset 3px 0 0 ${item.kleur}` }}>
                <p className="font-semibold text-sm mb-1" style={{ color: "#1E2D3D" }}>{item.titel}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#6C7B8B" }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {gerelateerd.length > 0 && (
        <section className="py-16" style={{ borderTop: "1px solid #E2E6EA" }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ color: "#D97706", letterSpacing: "0.18em" }}>
            Energie bespaartips
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gerelateerd.map((p) => <ReceptCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}

      <section className="pb-24">
        <NewsletterForm />
      </section>
    </div>
  );
}
