export default function robots() {
  return {
    rules: [
      // Alle crawlers toegestaan
      { userAgent: "*", allow: "/" },
      // Google (AI Overviews + Gemini)
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      // OpenAI / ChatGPT
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Anthropic / Claude
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      // Microsoft Copilot (Bing)
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: "https://www.geldsjoege.nl/sitemap.xml",
  };
}
