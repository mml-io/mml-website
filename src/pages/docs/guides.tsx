import Head from "next/head";
import * as React from "react";

import GuidesList from "@/src/components/GuidesList";
import { getPageTitle } from "@/src/util";

const GuidesPage = () => {
  return (
    <>
      <Head>{getPageTitle("Docs - Guides")}</Head>
      <main className="mx-auto mt-32 max-w-[450px] px-4 sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[800px]">
        <GuidesList />
      </main>
    </>
  );
};

export default GuidesPage;
