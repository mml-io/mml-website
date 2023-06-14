import { validateMMLDocument } from "@mml-io/mml-schema-validator";

import { examples } from "@/src/content/docs/index";
import { DocsReference } from "@/types/docs-reference";

describe("Examples", () => {
  // Convert the object to an array of key-value pair arrays
  // Define the test function
  const testFunction = (key: string, value: DocsReference) => {
    // Replace this with your actual test function
    try {
      const validationErrors = validateMMLDocument(
        `<html><head></head><body>${value.code}</body></html>`,
      );
      expect(validationErrors).toBeNull();
    } catch (e) {
      console.error(`Error validating example: ${key}. Message: ${e.message} Line: ${e.line}. Column: ${e.column}`);
      throw new Error(`Error validating example: ${key}, ${e}`);
    }
  };

  const allExamples: Array<[string, DocsReference]> = [];
  Object.entries(examples).forEach(([tagKey, tagDocs]) => {
    Object.entries(tagDocs.examples).forEach(([exampleName, value]) => {
      allExamples.push([`${tagKey} - ${exampleName}`, value]);
    });
  });

  test.each(allExamples)('validate example "%s"', (key, value) => {
    testFunction(key, value);
  });
});
