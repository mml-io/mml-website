import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import { guides } from "@/src/content/guides";
import { getPageTitle } from "@/src/util";

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
        pageName={title}
        parents={[
          { name: "Docs", path: "docs" },
          { name: "Guides", path: "guides" },
        ]}
      />
      <Head>{getPageTitle(title)}</Head>
      <div className="mx-auto max-w-[450px] sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <div className="mr-4 flex w-full">
          <main className="w-full flex-1 px-4 sm:px-0 lg:mr-5 lg:flex-[1_0_766px]">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="mt-4">
              <Body />
            </div>
          </main>
          <LinkList elementList={["CodeSandbox", "Glitch", "Digital Ocean", "Heroku", "Railway"]} />
        </div>
      </div>
    </>
  );
};

export default GuidePage;
