import Link from "next/link";
import NewsletterForm from "../../components/NewsletterForm";

const BASE = "https://geldsjoege.nl";

export const metadata = {
  title: "Over Geld Sjoege | Slim én duurzaam besparen voor Nederlanders",
  description: "Geld Sjoege deelt praktische bespaartips die goed zijn voor je portemonnee én het milieu. Geen theorie, direct toepasbaar.",
  alternates: { canonical: `${BASE}/over` },
  openGraph: {
    type: "website",
    url: `${BASE}/over`,
    title: "Over Geld Sjoege",
    description: "Praktische bespaartips die goed zijn voor je portemonnee én het milieu. Eerlijk, direct toepasbaar.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Geld Sjoege",
  url: BASE,
  description: "Praktische bespaartips die goed zijn voor je portemonnee én het milieu.",
  knowsAbout: ["Geld besparen", "Energie besparen", "Abonnementen opzeggen", "Belasting teruggave", "Slim winkelen"],
};

export default function OverPage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />

      <div className="max-w-2xl">
        <section className="pt-20 pb-12">
          <p className="eyebrow mb-5">Over Geld Sjoege</p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight" style={{ color: "#1E2D3D" }}>
            Wat is Geld Sjoege?
          </h1>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#6C7B8B" }}>
            <p>
              Geld Sjoege is ontstaan uit een simpele ontdekking: je kunt honderden euro&apos;s per jaar besparen
              zonder grote offers. Op energie, abonnementen, verzekeringen en boodschappen. Niet door te leven als een
              kluizenaar, maar door een paar gewoonten bewuster in te richten.
            </p>
            <p>
              Wat daarbij opviel: veel van die verspilling is niet alleen slecht voor je portemonnee, maar ook voor het milieu.
              Minder verbruiken, slimmer inkopen, bewuster kiezen. Het helpt je én de planeet.
            </p>
            <p>
              Geld Sjoege deelt welke stappen werken, hoe je ze volhoudt en wat je er concreet mee bespaart.
              Geen financiële kennis nodig.{" "}
              <strong style={{ color: "#059669" }}>Alleen praktische bespaartips</strong>{" "}
              die je vandaag nog kunt gebruiken.
            </p>
          </div>
        </section>

        <section className="py-10" style={{ borderTop: "1px solid #E2E6EA" }}>
          <p className="eyebrow mb-3">De naam</p>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#1E2D3D" }}>Waarom &ldquo;Sjoege&rdquo;?</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#6C7B8B" }}>
            <p>
              <em style={{ color: "#059669", fontStyle: "normal", fontWeight: 600 }}>Sjoege</em> is oud-Amsterdams
              voor &ldquo;verstand van iets hebben&rdquo;. Als je ergens sjoege van hebt, snap je hoe het werkt.
              Je hebt het door. Je laat je niet zomaar een oor aannaaien.
            </p>
            <p>
              Dat is precies wat Geld Sjoege wil zijn: een plek waar je leert hoe geld écht werkt in je dagelijks leven.
              Niet met droge theorie of ingewikkelde spreadsheets. Maar met concrete stappen die je vandaag nog kunt zetten.
            </p>
            <p>
              Sjoege van geld hebben betekent niet dat je er de hele dag mee bezig bent.
              Het betekent dat je de slimme keuzes maakt op de momenten die ertoe doen.
              En de rest gewoon loslaat.
            </p>
          </div>
        </section>

        <section className="py-10" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "#1E2D3D" }}>Waarom Geld Sjoege?</h2>
          <div className="space-y-5">
            {[
              {
                title: "Geen theorie, alleen resultaat",
                desc: "Elke bespaartip bevat de exacte stappen. Volg ze op en bespaar. Geen cursus, geen boek, geen accountant nodig.",
              },
              {
                title: "Voelbare eurobesparing",
                desc: "De Bespaar-Meter maakt concreet hoeveel je bespaart. Niet 'je kunt wat besparen', maar '€180 per jaar op dit onderdeel'.",
              },
              {
                title: "Goed voor jezelf én het milieu",
                desc: "Slim besparen betekent ook minder verspillen. Minder verbruik, bewuster inkopen, duurzamere keuzes. Winst voor je portemonnee én de planeet.",
              },
              {
                title: "Op de lange termijn vol te houden",
                desc: "Geen quick fixes, maar gewoonten die blijven. De tips zijn zo opgezet dat je ze éénmalig instelt of snel herhaalt.",
              },
              {
                title: "Eerlijk over beperkingen",
                desc: "Elke tip heeft een sectie 'Wanneer werkt dit niet'. Niet elke tip werkt voor iedereen. Dat zeg ik er gewoon bij.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#059669" }} />
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#1E2D3D" }}>{item.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#6C7B8B" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10" style={{ borderTop: "1px solid #E2E6EA" }}>
          <h2 className="text-xl font-semibold mb-6" style={{ color: "#1E2D3D" }}>Veelgestelde vragen</h2>
          <div className="space-y-5">
            {[
              {
                v: "Is Geld Sjoege gratis?",
                a: "Ja, volledig. De bespaartips, stappen en uitleg zijn gratis beschikbaar. Geen account, geen betaalmuur.",
              },
              {
                v: "Heb ik financiële kennis nodig?",
                a: "Nee. De fixes zijn ontworpen voor mensen die willen besparen zonder er iets van te hoeven weten. Gewoon stap voor stap volgen.",
              },
              {
                v: "Hoeveel kan ik echt besparen?",
                a: "Dat hangt af van je situatie. De Bespaar-Meter in elk artikel laat zien wat jouw besparing is. Gemiddeld bespaart een tip €200 per jaar.",
              },
              {
                v: "Hoe vaak wordt Geld Sjoege bijgewerkt?",
                a: "Er komen regelmatig nieuwe bespaartips bij. Schrijf je in voor de nieuwsbrief om ze direct te ontvangen.",
              },
            ].map((item) => (
              <div key={item.v} className="rounded-xl p-5" style={{ border: "1px solid #E2E6EA", backgroundColor: "#FFFFFF" }}>
                <p className="font-semibold text-sm mb-2" style={{ color: "#1E2D3D" }}>{item.v}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6C7B8B" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10" style={{ borderTop: "1px solid #E2E6EA" }}>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#F0F4F8", color: "#059669", border: "1px solid #E2E6EA" }}>
              Bekijk alle Bespaartips →
            </Link>
            <Link href="/besparen-voor-beginners" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#F0F4F8", color: "#059669", border: "1px solid #E2E6EA" }}>
              Beginnen met besparen →
            </Link>
          </div>
        </section>
      </div>

      <section className="pb-24 pt-8">
        <NewsletterForm />
      </section>
    </div>
  );
}
