import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import { guides } from "@/src/content/guides";
import { getPageTitle } from "@/src/util";

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

  const { linkList, title } = currentGuide;
  const Body = currentGuide.body;

  return (
    <>
      <Head>{getPageTitle(title)}</Head>
      <div className="flex pt-32">
        <ReferenceNavigation />
        <div className="px-5 sm:px-12 w-full">
          <main className="mx-auto px-4 center-column">
            <Breadcrumb
              pageName={title}
              parents={[
                { name: "Docs", path: "docs" },
                { name: "Guides", path: "guides" },
              ]}
            />
            <h1 className="text-4xl font-semibold mb-4">{title}</h1>
            <div className="mt-4">
              <Body />
            </div>
          </main>
        </div>
        <LinkList elementList={linkList.map((link) => ({ id: link.toLowerCase(), name: link }))} />
      </div>
    </>
  );
};

export default GuidePage;
