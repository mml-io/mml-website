import Head from "next/head";
import * as React from "react";

import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";
import { getPageTitle } from "@/src/util";

import Breadcrumb from "../components/Common/Breadcrumb";
import LinkList from "../components/Common/LinkList";
import ReferenceNavigation from "../components/Common/ReferenceNavigation";
import GuidesList from "../components/GuidesList";

const DocsPage = () => {
  return (
    <>
      <Head>{getPageTitle("Docs")}</Head>
      <div className="flex">
        <ReferenceNavigation />
        <div className="px-5 sm:px-12 w-full">
          <main className="mx-auto mt-32 px-4 center-column">
            <Breadcrumb pageName={`Docs`} parents={[]} />
            <GuidesList />
            <ElementsTable />
            <EventsTable />
          </main>
        </div>
        <div className="basis-80 flex-grow-0 flex-shrink-0 w-full hidden 3xl:block 2xl:relative"></div>
      </div>
    </>
  );
};

export default DocsPage;
