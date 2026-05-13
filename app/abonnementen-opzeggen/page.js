import Link from "next/link";
import ReceptCard from "../../components/ReceptCard";
import NewsletterForm from "../../components/NewsletterForm";
import { getPosts } from "../../lib/notion";

const BASE = "https://geldsjoege.nl";

export const metadata = {
  title: "Abonnementen opzeggen: stop met betalen voor wat je niet gebruikt",
  description: "Ontdek welke abonnementen je kunt opzeggen en hoe je dat doet. Van streamingdiensten tot appabonnementen, stap voor stap uitgelegd.",
  alternates: { canonical: `${BASE}/abonnementen-opzeggen` },
  openGraph: {
    type: "article",
    url: `${BASE}/abonnementen-opzeggen`,
    title: "Abonnementen opzeggen",
    description: "Stop met betalen voor wat je niet gebruikt. Stap voor stap.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Abonnementen opzeggen: stop met betalen voor wat je niet gebruikt",
  description: "Ontdek welke abonnementen je kunt opzeggen en hoe je dat doet.",
  author: { "@type": "Organization", name: "Geld Sjoege" },
  publisher: { "@type": "Organization", name: "Geld Sjoege", url: BASE },
  url: `${BASE}/abonnementen-opzeggen`,
  inLanguage: "nl-NL",
  step: [
    { "@type": "HowToStep", name: "Overzicht maken", text: "Maak een lijst van alle abonnementen via je bank." },
    { "@type": "HowToStep", name: "Gebruik beoordelen", text: "Wanneer heb je het voor het laast gebruikt?" },
    { "@type": "HowToStep", name: "Opzeggen", text: "Zeg op via de app, website of met een opzegbrief." },
  ],
};

export const revalidate = 3600;

export default async function AbonnementenOpzeggenPage() {
  const posts = await getPosts();
  const gerelateerd = posts
    .filter((p) => p.categorie === "Abonnementen")
    .slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-2xl">

        <section className="pt-20 pb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#2C5A85", letterSpacing: "0.18em" }}>
            Abonnementen opzeggen
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-5 leading-tight" style={{ color: "#1E2D3D" }}>
            Stop met betalen voor wat je niet gebruikt
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#6C7B8B" }}>
            De gemiddelde Nederlander heeft 12 actieve abonnementen. Veel daarvan worden amper gebruikt.
            Een uur besteden aan dit onderwerp kan €500–800 per jaar opleveren.
          </p>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>
            Hoe abonnementen sluipen
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
            <p>
              Gratis proefperiode, daarna automatisch doorlopend. Kleine maandelijkse bedragen die je vergeet te cancellen.
              Een app die je ooit hebt gedownload en nooit meer gebruikt. Ze zijn ontworpen om te worden vergeten.
            </p>
            <p>
              De oplossing is simpel: één keer per jaar de bankafschriften doorspitten op automatische incasso&apos;s.
              Elke incasso die je niet herkent of amper gebruikt is een kandidaat om op te zeggen.
            </p>
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>
            Stap voor stap: abonnementenavond
          </h2>
          <ol className="space-y-3">
            {[
              { stap: "1", tekst: "Open je bankapp en zoek op 'automatische incasso' of bekijk alle maandelijkse afschrijvingen." },
              { stap: "2", tekst: "Maak een lijst: wat is het, hoeveel betaal je, wanneer heb je het voor het laast gebruikt?" },
              { stap: "3", tekst: "Categoriseer: bewaren, opzeggen, of downsizen (goedkoper pakket)." },
              { stap: "4", tekst: "Zeg op via de app, website of opzegbrief. Controleer na twee weken of de incasso gestopt is." },
            ].map((item) => (
              <li key={item.stap} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(44,90,133,0.1)", color: "#2C5A85" }}>
                  {item.stap}
                </span>
                <p className="text-base leading-relaxed" style={{ color: "#4A5568" }}>{item.tekst}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-5" style={{ color: "#1E2D3D" }}>
            De meest vergeten abonnementen
          </h2>
          <div className="space-y-3">
            {[
              { naam: "Streaming", voorbeelden: "Netflix, Disney+, Spotify, Apple Music", gemiddeld: "€15–20/maand" },
              { naam: "Cloud opslag", voorbeelden: "iCloud, Google One, Dropbox", gemiddeld: "€3–10/maand" },
              { naam: "App-abonnementen", voorbeelden: "Fitness-apps, meditatie, VPN", gemiddeld: "€5–15/maand" },
              { naam: "Kranten & tijdschriften", voorbeelden: "Digitale abonnementen", gemiddeld: "€5–20/maand" },
              { naam: "Software", voorbeelden: "Adobe, Microsoft 365, antivirus", gemiddeld: "€5–30/maand" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-4"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E6EA", borderLeft: "3px solid #2C5A85" }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm" style={{ color: "#1E2D3D" }}>{item.naam}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#F0F4F8", color: "#6C7B8B" }}>
                    {item.gemiddeld}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#9BA8B5" }}>{item.voorbeelden}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>Andere onderwerpen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titel: "Besparen voor beginners", href: "/besparen-voor-beginners", kleur: "#059669", desc: "De eerste stappen naar structureel minder uitgeven." },
              { titel: "Energie besparen", href: "/energie-besparen", kleur: "#D97706", desc: "Gas, licht en slimme meters." },
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
            style={{ color: "#2C5A85", letterSpacing: "0.18em" }}>
            Abonnement bespaartips
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
