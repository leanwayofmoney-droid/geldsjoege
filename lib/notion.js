const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

function getText(prop) {
  return prop?.rich_text?.map((t) => t.plain_text).join("") || "";
}

function getTitle(prop) {
  return prop?.title?.map((t) => t.plain_text).join("") || "";
}

function mapPage(page) {
  const p = page.properties;
  return {
    id: page.id,
    slug: getText(p["Slug"]),
    title: getTitle(p["Titel"]),
    excerpt: getText(p["Excerpt"]),
    date: getText(p["Datum"]),
    readTime: getText(p["Leestijd"]),
    tool: getText(p["Tool"]),
    niveau: getText(p["Niveau"]),
    savingsPerTask: p["SavingsPerTask"]?.number || 0,
    frequentieLabel: getText(p["FrequentieLabel"]),
    color: getText(p["Color"]) || "#059669",
    image: getText(p["ImageUrl"]),
    savingsEuro: p["SavingsEuro"]?.number || null,
    savingsEuroLabel: getText(p["SavingsEuroLabel"]) || null,
    categorie: p["Categorie"]?.select?.name || null,
    curiosityHeader: getText(p["CuriosityHeader"]),
    persoonlijkeMissie: getText(p["PersoonlijkeMissie"]),
    transformatie: getText(p["Transformatie"]),
    strategischeLogica: getText(p["StrategischeLogica"]),
    nuance: getText(p["Nuance"]),
    impactCTA: getText(p["ImpactCTA"]),
    stapVoorStap: getText(p["StapVoorStap"]),
    variaties: getText(p["Variaties"]),
    faq: getText(p["FAQ"]),
  };
}

export async function getPosts() {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter: { property: "Gepubliceerd", checkbox: { equals: true } },
        sorts: [{ property: "Datum", direction: "descending" }],
      }),
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return (data.results || []).map(mapPage);
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter: {
          and: [
            { property: "Slug", rich_text: { equals: slug } },
            { property: "Gepubliceerd", checkbox: { equals: true } },
          ],
        },
      }),
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  if (!data.results?.length) return null;
  return mapPage(data.results[0]);
}
