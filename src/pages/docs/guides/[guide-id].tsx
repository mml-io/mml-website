import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import { guides } from "@/src/content/guides";

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
export function getStaticProps({ params }) {
  // params contains the element returned by getStaticPaths
  const guideId = params["guide-id"];

  // Pass post data to the page via props
  return { props: { guideId } };
}

const GuidePage = ({ guideId }: { guideId: string }) => {
  const title = guides[guideId].title;
  const Body = guides[guideId].body;

  return (
    <>
      <Breadcrumb
        pageName={`${guideId}`}
        parents={[
          { name: "Docs", path: "docs" },
          { name: "Guides", path: "guides" },
        ]}
      />
      <Head>
        <title>{title} - MML</title>
      </Head>
      <div className="mx-auto max-w-[450px] sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="mt-4">
              <Body />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
