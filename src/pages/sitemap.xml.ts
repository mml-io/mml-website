import type { ServerResponse } from "http";

import { posts } from "@/src/content/blogPosts";

import { getStaticPaths as getBlogStaticPaths } from "./blog/[post-id]";
import { getStaticPaths as getGuideStaticPaths } from "./docs/guides/[guide-id]";
import { getStaticPaths as getElementStaticPaths } from "./docs/reference/elements/[reference-id]";
import { getStaticPaths as getEventStaticPaths } from "./docs/reference/events/[event-id]";

function url(loc: string, opts: { changefreq: string; priority: string; lastmod?: string }) {
  return `
    <url>
      <loc>${loc}</loc>${opts.lastmod ? `\n      <lastmod>${opts.lastmod}</lastmod>` : ""}
      <changefreq>${opts.changefreq}</changefreq>
      <priority>${opts.priority}</priority>
    </url>`;
}

function generateSiteMap() {
  const elements = getElementStaticPaths();
  const events = getEventStaticPaths();
  const guides = getGuideStaticPaths();
  const blogs = getBlogStaticPaths();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${url("https://mml.io", { changefreq: "weekly", priority: "1.0" })}
  ${url("https://mml.io/docs", { changefreq: "weekly", priority: "0.8" })}
  ${url("https://mml.io/blog", { changefreq: "weekly", priority: "0.6" })}
  ${url("https://mml.io/examples", { changefreq: "monthly", priority: "0.6" })}
  ${url("https://mml.io/3d-web-experience", { changefreq: "monthly", priority: "0.6" })}
  ${elements.paths
    .map((element) =>
      url(`https://mml.io/docs/reference/elements/${element.params["reference-id"]}`, {
        changefreq: "monthly",
        priority: "0.7",
      }),
    )
    .join("")}
  ${events.paths
    .map((event) =>
      url(`https://mml.io/docs/reference/events/${event.params["event-id"]}`, {
        changefreq: "monthly",
        priority: "0.7",
      }),
    )
    .join("")}
  ${guides.paths
    .map((guide) =>
      url(`https://mml.io/docs/guides/${guide.params["guide-id"]}`, {
        changefreq: "monthly",
        priority: "0.7",
      }),
    )
    .join("")}
  ${blogs.paths
    .map((blog) => {
      const postId = blog.params["post-id"];
      const post = posts[postId];
      return url(`https://mml.io/blog/${postId}`, {
        changefreq: "yearly",
        priority: "0.5",
        lastmod: post?.date,
      });
    })
    .join("")}
</urlset>`;
}

function SiteMap() {}

export function getServerSideProps({ res }: { res: ServerResponse }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
