import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import * as React from "react";

import { DocsRow, DocsTableContainer } from "@/src/components/DocsTable";

const schemaDefinition = createSchemaDefinition(schemaJSON);

const elementSchema = Object.values(schemaDefinition.elements);

const ElementsTable = () => {
  return (
    <DocsTableContainer
      title="Elements"
      description="All the available MML Elements"
      type="Elements"
      className="mt-8"
    >
      {elementSchema
        .filter((element) => element.name.startsWith("m-"))
        .map((element) => (
          <DocsRow
            description={element.description}
            name={`<${element.name}>`}
            link={`/docs/reference/elements/${element.name}`}
            key={element.name}
          />
        ))}
    </DocsTableContainer>
  );
};

export default ElementsTable;
