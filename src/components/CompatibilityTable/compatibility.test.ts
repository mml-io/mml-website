import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";

import unrealJSON from "./unreal.json";
import webJSON from "./web.json";

const schemaDefinition = createSchemaDefinition(schemaJSON);

type CompatibilityTableJSON = {
  [key: string]: {
    [key: string]: {
      supported: boolean;
      description: string;
    };
  };
};

const webCompatibility: CompatibilityTableJSON = webJSON;
const unrealCompatibility: CompatibilityTableJSON = unrealJSON;

const ignoredElements = ["html", "head", "body", "script"];

function validateCompatibilityTable(webCompatibility: CompatibilityTableJSON): Array<string> {
  const errors: Array<string> = [];

  for (const key in schemaDefinition.elements) {
    if (!webCompatibility[key]) {
      if (!ignoredElements.includes(key)) {
        errors.push(`Missing compatibility table for element: ${key}`);
      }
    } else {
      const element = webCompatibility[key];
      const allValidAttributes = new Set<string>();
      for (const attribute of schemaDefinition.elements[key].attributes) {
        allValidAttributes.add(attribute.name);
        if (!element[attribute.name]) {
          errors.push(`Missing compatibility table for ${key} attribute: ${attribute.name}`);
        }
      }
      for (const attributeGroupKey of schemaDefinition.elements[key].attributeGroups) {
        for (const attribute of schemaDefinition.attributeGroups[attributeGroupKey].attributes) {
          allValidAttributes.add(attribute.name);
          if (!element[attribute.name]) {
            errors.push(
              `Missing compatibility table for ${key} attribute: ${attribute.name} from attribute group: ${attributeGroupKey}`,
            );
          }
        }
      }
      for (const attributeKey in element) {
        if (attributeKey === key) {
          // This is the indicator that the element is supported
        } else if (!allValidAttributes.has(attributeKey)) {
          errors.push(
            `Extra attribute: ${attributeKey} in compatibility table for element: ${key}`,
          );
        }
      }
    }
  }
  return errors;
}

describe("Compatibility", () => {
  it("web compatibility should include all attributes", () => {
    const errors = validateCompatibilityTable(webCompatibility);
    if (errors.length > 0) {
      throw errors;
    }
  });

  it("unreal compatibility should include all attributes", () => {
    const errors = validateCompatibilityTable(unrealCompatibility);
    if (errors.length > 0) {
      throw errors;
    }
  });
});
