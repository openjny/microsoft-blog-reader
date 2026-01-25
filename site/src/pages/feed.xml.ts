import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getArticles, stripHtml } from "../lib/db";

export function GET(context: APIContext) {
  const articles = getArticles(50);

  return rss({
    title: "Microsoft Blog Reader",
    description: "Aggregated feed of Microsoft Tech Community blogs",
    site: context.site ?? "https://example.com",
    items: articles.map((article) => ({
      title: article.title,
      pubDate: new Date(article.pub_date),
      link: article.link,
      description: stripHtml(article.description),
      author: article.author ?? undefined,
      categories: article.category ? [article.category] : undefined,
    })),
    customData: `<language>en-us</language>`,
  });
}
