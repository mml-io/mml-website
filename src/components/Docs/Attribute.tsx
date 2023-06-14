import { Attribute } from "@mml-io/mml-schema";
import * as React from "react";




export function Attribute(props: { attribute: Attribute }) {
  return (
    <div>


      {props.attribute.enum && (
        <ul>
          {props.attribute.enum.map((enumValue) => (
            <li key={enumValue}>{enumValue}</li>
          ))}
        </ul>
      )}
      {props.attribute.description &&
        props.attribute.description.map((descriptionText, index) => (

        ))}
    </div>
  );
}
