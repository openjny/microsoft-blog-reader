import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getArticleGroups } from "../lib/blogs";
import { getArticles, stripHtml } from "../lib/db";

/** Maximum number of articles to include in the RSS feed */
const RSS_FEED_LIMIT = 50;

export function GET(context: APIContext) {
  const articles = getArticles(RSS_FEED_LIMIT);

  return rss({
    title: "Microsoft Blog Reader",
    description: "Aggregated feed of Microsoft Tech Community blogs",
    site: context.site ?? "https://example.com",
    items: articles.map((article) => {
      const groups = getArticleGroups(article.title, article.description, article.board);
      const categories: string[] = [...groups];
      if (article.board) {
        categories.push(article.board);
      }
      return {
        title: article.title,
        pubDate: new Date(article.pub_date),
        link: article.link,
        description: stripHtml(article.description),
        author: article.author ?? undefined,
        categories: categories.length > 0 ? categories : undefined,
      };
    }),
    customData: "<language>en-us</language>",
  });
}
