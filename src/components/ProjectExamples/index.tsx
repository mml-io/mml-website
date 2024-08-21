import * as React from "react";

import { examples } from "@/src/content/examples";

import SectionTitle from "../Common/SectionTitle";
import { ExampleLink } from "../ExampleLink/ExampleLink";

const Examples = () => {
  return (
    <>
      <section id="features" className="mb-16">
        <div className="container">
          <SectionTitle title="Examples" paragraph="" center mb="40px" />

          <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(examples).map(([id, { image, name, description }]) => (
              <ExampleLink
                key={id}
                exampleId={id}
                description={description}
                name={name}
                image={image}
                isSelected={false}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Examples;
