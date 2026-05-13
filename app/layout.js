import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const BASE = "https://geldsjoege.nl";

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Geld Sjoege | Slim besparen voor iedereen",
    template: "%s | Geld Sjoege",
  },
  description:
    "Praktische bespaartips voor je dagelijkse uitgaven. Slim én duurzaam besparen, voor jezelf én het milieu. Stap voor stap uitgelegd.",
  keywords: [
    "geld besparen", "besparen tips", "energie besparen", "abonnementen opzeggen",
    "boodschappen besparen", "verzekeringen vergelijken", "belasting teruggave",
    "slim besparen Nederland", "duurzaam besparen", "bespaartips",
  ],
  authors: [{ name: "Geld Sjoege", url: BASE }],
  creator: "Geld Sjoege",
  publisher: "Geld Sjoege",
  verification: {
    google: "YOFLYjZl3qnD30R_1kZ7RkcaR6qm0lYZtR75Cyq_220",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: BASE,
    siteName: "Geld Sjoege",
    title: "Geld Sjoege | Slim besparen voor iedereen",
    description:
      "Praktische bespaartips voor je dagelijkse uitgaven. Slim én duurzaam besparen, stap voor stap uitgelegd.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Geld Sjoege | Slim besparen voor iedereen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geld Sjoege | Slim besparen voor iedereen",
    description:
      "Praktische bespaartips voor je dagelijkse uitgaven. Slim én duurzaam besparen, stap voor stap uitgelegd.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: BASE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": `${BASE}/#organization`,
                name: "Geld Sjoege",
                url: BASE,
                logo: {
                  "@type": "ImageObject",
                  url: `${BASE}/og-default.png`,
                  width: 1200,
                  height: 630,
                },
                description: "Praktische bespaartips voor Nederlanders. Slim én duurzaam besparen op boodschappen, energie, abonnementen, belasting en meer. Gemiddelde besparing per tip: €200 per jaar.",
                inLanguage: "nl-NL",
                knowsAbout: [
                  "Geld besparen Nederland",
                  "Energie besparen",
                  "Abonnementen opzeggen",
                  "Belasting teruggave",
                  "Boodschappen besparen",
                  "Thuiswerkvergoeding",
                  "Duurzaam besparen",
                  "Persoonlijke financiën",
                ],
                sameAs: [
                  "https://www.geldsjoege.nl",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${BASE}/#website`,
                url: BASE,
                name: "Geld Sjoege",
                description: "Praktische bespaartips voor Nederlanders",
                inLanguage: "nl-NL",
                publisher: { "@id": `${BASE}/#organization` },
                potentialAction: {
                  "@type": "SearchAction",
                  target: { "@type": "EntryPoint", urlTemplate: `${BASE}/blog?q={search_term_string}` },
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
