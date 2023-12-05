import { Attribute } from "@mml-io/mml-schema";
import * as React from "react";

import { attributeTypes } from "@/src/config/maps";
import { MarkDownDocs } from "@/src/config/mdx";

export function Attribute(props: { attribute: Attribute }) {
  return (
    <div>
      <MarkDownDocs className="inline-block [&>*]:mb-0">
        {"`" + props.attribute.name + "`"}
      </MarkDownDocs>
      :&nbsp;
      {props.attribute.type && (
        <span>{attributeTypes[props.attribute.type as keyof typeof attributeTypes]}</span>
      )}
      {props.attribute.enum && (
        <ul>
          {props.attribute.enum.map((enumValue) => (
            <li key={enumValue}>{enumValue}</li>
          ))}
        </ul>
      )}
      {props.attribute.description &&
        props.attribute.description.map((descriptionText, index) => (
          <div className="pl-4">
            <MarkDownDocs key={index}>{descriptionText}</MarkDownDocs>
          </div>
        ))}
    </div>
  );
}
