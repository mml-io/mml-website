import { Attribute as MMLSchemaAttribute } from "@mml-io/mml-schema";
import * as React from "react";

import { attributeTypes } from "@/src/config/maps";
import { MarkDownDocs } from "@/src/config/mdx";

import { AnchorLink } from "../Anchors/AnchorLink";

export function Attribute(props: { attribute: MMLSchemaAttribute }) {
  const anchorId = `attribute-${props.attribute.name}`;
  const attributeTypeName = props.attribute.enum
    ? "enum"
    : attributeTypes[props.attribute.type as keyof typeof attributeTypes];
  return (
    <div>
      <AnchorLink anchorId={anchorId} title={props.attribute.name} verticalOffset>
        <MarkDownDocs className="inline-block [&>*]:mb-0">
          {`\`${props.attribute.name}\`: \`${attributeTypeName}\``}
        </MarkDownDocs>
      </AnchorLink>

      {props.attribute.enum && (
        <>
          {props.attribute.enum.map((enumValue) => (
            <MarkDownDocs
              className={"inline-block mr-2"}
              key={enumValue}
            >{`\`${enumValue}\``}</MarkDownDocs>
          ))}
        </>
      )}
      {props.attribute.description &&
        props.attribute.description.map((descriptionText, index) => (
          <div className="pl-4" key={index}>
            <MarkDownDocs>{descriptionText.replaceAll(/(\s{2,}|\n)/g, " ")}</MarkDownDocs>
          </div>
        ))}
    </div>
  );
}
