import { Attribute } from "@mml-io/mml-schema";
import * as React from "react";

import { attributeTypes } from "@/src/config/maps";
import { MarkDown } from "@/src/config/mdx";

export function Attribute(props: { attribute: Attribute }) {
  return (
    <div>
      <MarkDown className="inline-block [&>*]:mb-0">{"`" + props.attribute.name + "`"}</MarkDown>
      :&nbsp;
      {props.attribute.type && <span>{attributeTypes[props.attribute.type]}</span>}
      {props.attribute.enum && (
        <ul>
          {props.attribute.enum.map((enumValue) => (
            <li key={enumValue}>{enumValue}</li>
          ))}
        </ul>
      )}
      {props.attribute.description &&
        props.attribute.description.map((descriptionText, index) => (
          <MarkDown key={index}>{descriptionText}</MarkDown>
        ))}
    </div>
  );
}
