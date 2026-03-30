import { MDXProvider } from "@mdx-js/react";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import PageMeta from "@/src/components/PageMeta";
import { componentsDocs } from "@/src/config/mdx";
import { guides } from "@/src/content/guides";

import ReferenceNavigation from "../../../components/Common/ReferenceNavigation";

export function getStaticPaths() {
  // Call an external API endpoint to get posts

  // Filter the element to only those that start with "m-" for now
  const elements = Object.keys(guides).map((element) => element);

  // Get the paths we want to pre-render based on elements
  const paths = elements.map((element) => ({
    params: { "guide-id": element },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export function getStaticProps({ params }: { params: { "guide-id": string } }) {
  // params contains the element returned by getStaticPaths
  const guideId = params["guide-id"];

  // Pass post data to the page via props
  return { props: { guideId } };
}

const GuidePage = ({ guideId }: { guideId: string }) => {
  const currentGuide = guides[guideId];

  const { linkList, title, description } = currentGuide;
  const Body = currentGuide.body;

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        path={`/docs/guides/${guideId}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: title,
          description,
          url: `https://mml.io/docs/guides/${guideId}`,
          publisher: { "@type": "Organization", name: "MML", url: "https://mml.io" },
        }}
      />
      <div className="flex pt-32">
        <ReferenceNavigation />
        <div className="px-5 sm:px-12 w-full">
          <main className="mx-auto px-4 center-column mdx">
            <Breadcrumb
              pageName={title}
              parents={[
                { name: "Docs", path: "docs" },
                { name: "Guides", path: "guides" },
              ]}
            />
            <article>
              <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
              <MDXProvider components={componentsDocs}>
                <Body />
              </MDXProvider>
            </article>
          </main>
        </div>
        <LinkList elementList={linkList} />
      </div>
    </>
  );
};

export default GuidePage;
