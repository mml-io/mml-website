import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import * as React from "react";



import { Attribute } from "./Attribute";

const schemaDefinition = createSchemaDefinition(schemaJSON);

export function AttributeGroup(props: { attributeGroupName: string }) {
  const attributeGroup = schemaDefinition.attributeGroups[props.attributeGroupName];
  return (
    <div>

      <ul>
        {Object.values(attributeGroup.attributes).map((attribute) => (
          <li key={attribute.name}>
            <Attribute attribute={attribute} />
          </li>
        ))}
      </ul>
    </div>
  );
}
