import type { ServerResponse } from "http";

import { getStaticPaths as getBlogStaticPaths } from "./blog/[post-id]";
import { getStaticPaths as getGuideStaticPaths } from "./docs/guides/[guide-id]";
import { getStaticPaths as getElementStaticPaths } from "./docs/reference/elements/[reference-id]";
import { getStaticPaths as getEventStaticPaths } from "./docs/reference/events/[event-id]";

function generateSiteMap() {
  const elements = getElementStaticPaths();
  const events = getEventStaticPaths();
  const guides = getGuideStaticPaths();
  const blogs = getBlogStaticPaths();

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://mml.io</loc>
     </url>
     <url>
       <loc>https://mml.io/docs</loc>
     </url>
     <url>
       <loc>https://mml.io/docs/reference/elements</loc>
     </url>
     ${elements.paths
       .map((element) => {
         return `
       <url>
           <loc>${`https://mml.io/docs/reference/elements/${element.params["reference-id"]}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${events.paths
       .map((event) => {
         return `
       <url>
           <loc>${`https://mml.io/docs/reference/events/${event.params["event-id"]}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${guides.paths
       .map((guide) => {
         return `
       <url>
           <loc>${`https://mml.io/docs/guides/${guide.params["guide-id"]}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${blogs.paths
       .map((blog) => {
         return `
       <url>
           <loc>${`https://mml.io/blog/${blog.params["post-id"]}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {}

export function getServerSideProps({ res }: { res: ServerResponse }) {
  // We make an API call to gather the URLs for our site

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
