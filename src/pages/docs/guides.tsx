import Head from "next/head";
import * as React from "react";

import GuidesList from "@/src/components/GuidesList";
import { getPageTitle } from "@/src/util";

const GuidesPage = () => {
  return (
    <>
      <Head>{getPageTitle("Docs - Guides")}</Head>
      <main className="mx-auto w-full px-8 lg:px-12 max-w-centerColumn mt-32">
        <GuidesList />
      </main>
    </>
  );
};

export default GuidesPage;
