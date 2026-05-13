import Link from "next/link";
import ReceptCard from "../../components/ReceptCard";
import NewsletterForm from "../../components/NewsletterForm";
import { getPosts } from "../../lib/notion";

const BASE = "https://geldsjoege.nl";

export const metadata = {
  title: "Besparen voor beginners: zo begin je vandaag nog",
  description: "Waar begin je als je wilt besparen? Stap voor stap uitgelegd zonder financiële kennis. Van boodschappen tot verzekeringen, hier start je.",
  alternates: { canonical: `${BASE}/besparen-voor-beginners` },
  openGraph: {
    type: "article",
    url: `${BASE}/besparen-voor-beginners`,
    title: "Besparen voor beginners",
    description: "De eerste stappen naar structureel minder uitgeven. Geen financiële kennis nodig.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Besparen voor beginners: zo begin je vandaag nog",
  description: "Waar begin je als je wilt besparen? Stap voor stap uitgelegd zonder financiële kennis.",
  author: { "@type": "Person", name: "Stefan" },
  publisher: { "@type": "Organization", name: "Geld Sjoege", url: BASE },
  url: `${BASE}/besparen-voor-beginners`,
  inLanguage: "nl-NL",
};

export const revalidate = 3600;

export default async function BesparenVoorBeginnersPage() {
  const posts = await getPosts();
  const gerelateerd = posts
    .filter((p) => ["Boodschappen", "Verzekeringen", "Belasting", "Wonen"].includes(p.categorie))
    .slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-2xl">

        <section className="pt-20 pb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#059669", letterSpacing: "0.18em" }}>
            Begin met besparen
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-5 leading-tight" style={{ color: "#1E2D3D" }}>
            Besparen voor beginners
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#6C7B8B" }}>
            Ik betaalde jarenlang te veel zonder het te weten. Voor energie, boodschappen, verzekeringen.
            Niet door onwil, maar door onwetendheid. Dit is de gids die ik had willen hebben toen ik begon.
          </p>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>Waarom besparen zo lastig lijkt</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
            <p>
              Besparen klinkt als inleveren. Minder eten, geen uitjes, altijd de goedkoopste kiezen.
              Maar de meeste besparingen hebben niets te maken met minder genieten. Ze gaan over slim
              kiezen: dezelfde kwaliteit voor minder geld.
            </p>
            <p>
              Het grote verschil zit in kleine, eenmalige acties die daarna automatisch blijven werken.
              Eén keer je energiecontract vergelijken kan €200 per jaar schelen. Zonder dat je er ooit
              nog aan hoeft te denken.
            </p>
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-5" style={{ color: "#1E2D3D" }}>
            De vijf grootste bespaarkansen voor beginners
          </h2>
          <div className="space-y-3">
            {[
              { nr: "01", titel: "Energiecontract vergelijken", tekst: "Gemiddeld €150–250 per jaar te besparen door over te stappen. Duurt 15 minuten.", kleur: "#D97706" },
              { nr: "02", titel: "Ongebruikte abonnementen opzeggen", tekst: "Streamingdiensten, apps, lidmaatschappen. Gemiddeld Nederlander betaalt €80/jaar voor diensten die hij niet gebruikt.", kleur: "#2C5A85" },
              { nr: "03", titel: "Verzekeringen vergelijken", tekst: "Zorgverzekering, inboedel, auto. Overstappen kost een uur en bespaart gemiddeld €300.", kleur: "#7C3AED" },
              { nr: "04", titel: "Slim boodschappen doen", tekst: "Huismerk, seizoensproducten, minder verspilling. €50–100 per maand is haalbaar.", kleur: "#059669" },
              { nr: "05", titel: "Belasting teruggave aanvragen", tekst: "Veel mensen laten geld liggen. Reiskosten, thuiswerken, studiekosten. Het telt op.", kleur: "#DC2626" },
            ].map((item) => (
              <div key={item.nr} className="flex gap-4 rounded-xl p-4"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E6EA", borderLeft: `3px solid ${item.kleur}` }}>
                <span className="text-sm font-bold shrink-0 mt-0.5" style={{ color: "rgba(44,90,133,0.3)" }}>{item.nr}</span>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#1E2D3D" }}>{item.titel}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#6C7B8B" }}>{item.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>Hoe gebruik je deze site?</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
            <p>
              Elke bespaartip op deze site heeft dezelfde opbouw: waarom het werkt, hoe je het doet (stap voor stap),
              en hoeveel je bespaart. De Bespaar-Meter laat zien wat jouw persoonlijke besparing is.
            </p>
            <p>
              Begin met één bespaartip. De makkelijkste, of de grootste besparing, kies wat bij je past.
              Na de eerste volgt de rest vanzelf.
            </p>
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>Andere onderwerpen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titel: "Energie besparen", href: "/energie-besparen", kleur: "#D97706", desc: "Gas, licht en slimme meters." },
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
            style={{ color: "#059669", letterSpacing: "0.18em" }}>
            Begin direct met besparen
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
