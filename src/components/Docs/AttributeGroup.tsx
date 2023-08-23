import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import * as React from "react";

import { MarkDown } from "@/src/config/mdx";

import { Attribute } from "./Attribute";

const schemaDefinition = createSchemaDefinition(schemaJSON);

export function AttributeGroup(props: { attributeGroupName: string }) {
  const attributeGroup = schemaDefinition.attributeGroups[props.attributeGroupName];
  return (
    <div>
      <MarkDown className="[&>*]:mt-8 [&>*]:rounded-md [&>*]:bg-body-color [&>*]:bg-opacity-10 [&>*]:p-2">{`### AttributeGroup: ${attributeGroup.name}`}</MarkDown>
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
