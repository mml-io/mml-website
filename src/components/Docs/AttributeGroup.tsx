import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import * as React from "react";

import { MarkDownDocs } from "@/src/config/mdx";

import { Attribute } from "./Attribute";
import { AnchorLink } from "../Anchors/AnchorLink";

const schemaDefinition = createSchemaDefinition(schemaJSON);

export function AttributeGroup(props: { attributeGroupName: string }) {
  const attributeGroup = schemaDefinition.attributeGroups[props.attributeGroupName];
  return (
    <div>
      <AnchorLink
        anchorId={`attribute-group-${attributeGroup.name}`}
        title={attributeGroup.name}
        verticalOffset
      >
        <MarkDownDocs className="[&>*]:mt-8 [&>*]:rounded-md [&>*]:bg-body-color [&>*]:bg-opacity-10 [&>*]:p-2 inline-block">{`### Attribute Group: ${attributeGroup.name}`}</MarkDownDocs>
      </AnchorLink>
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
