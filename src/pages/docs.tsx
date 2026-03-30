import * as React from "react";

import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";
import PageMeta from "@/src/components/PageMeta";

import Breadcrumb from "../components/Common/Breadcrumb";
import ReferenceNavigation from "../components/Common/ReferenceNavigation";
import GuidesList from "../components/GuidesList";

const DocsPage = () => {
  return (
    <>
      <PageMeta
        title="Documentation"
        description="Guides, element reference, and event reference for MML - Metaverse Markup Language."
        path="/docs"
      />
      <div className="flex">
        <ReferenceNavigation />
        <div className="w-full">
          <main className="container mt-24 pb-16 pr-4 lg:pr-6 xl:pr-8">
            <div className="mb-8">
              <Breadcrumb pageName={`Docs`} parents={[]} />
              <div className="mt-4 card p-6">
                <h1 className="text-3xl md:text-4xl font-semibold">Documentation</h1>
                <p className="mt-2 opacity-80">Guides, reference for MML elements and events.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <section className="card p-6">
                <GuidesList />
              </section>
              <section className="card p-6">
                <ElementsTable />
              </section>
              <section className="card p-6">
                <EventsTable />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DocsPage;
