import { Suspense } from "react";
import NewsletterForm from "../../components/NewsletterForm";
import FilteredPosts from "../../components/FilteredPosts";
import BlogTopFixes from "../../components/BlogTopFixes";
import { getPosts } from "../../lib/notion";

export const revalidate = 3600;

export const metadata = {
  title: "Bespaartips: duurzaam besparen op boodschappen, energie en meer | Geld Sjoege",
  description:
    "Praktische bespaartips voor boodschappen, energie, abonnementen en meer. Bewuste keuzes die goed zijn voor je portemonnee én het milieu. Direct toepasbaar.",
  alternates: { canonical: "https://geldsjoege.nl/blog" },
  openGraph: {
    type: "website",
    url: "https://geldsjoege.nl/blog",
    title: "Bespaartips | Geld Sjoege",
    description: "Duurzame bespaartips voor boodschappen, energie, abonnementen en meer.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-12">
        <p className="eyebrow mb-5">De Bespaar Werkplaats</p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight" style={{ color: "#1E2D3D" }}>
          Bespaartips voor meer geld in je zak
        </h1>
        <p className="max-w-lg leading-relaxed" style={{ color: "#6C7B8B" }}>
          Praktische bespaartips voor boodschappen, energie, abonnementen en meer. Bewuste keuzes die goed zijn voor je portemonnee én het milieu. Stap voor stap uitgelegd.
        </p>
      </section>

      <BlogTopFixes />

      <Suspense fallback={null}>
        <FilteredPosts posts={posts} />
      </Suspense>

      <section className="pb-24">
        <NewsletterForm />
      </section>
    </div>
  );
}
