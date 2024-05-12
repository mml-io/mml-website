import { DocsExamples } from "@/types/docs-reference";

import bounds from "./bounds.mml";
import loadRange from "./load-range.mml";
import primary from "./primary.mml";
import transformed from "./transformed.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-frame",
    description: "This is a basic m-frame that references a static mml file.",
    code: primary,
  },
  transformed: {
    title: "Transformed m-frame",
    description: "This example shows how m-frames can transform the document that they reference",
    code: transformed,
  },
  "load-range": {
    title: "m-frame with load-range",
    description:
      "This example shows how an m-frame can be configured to load and unload based on distance from the user/camera",
    code: loadRange,
  },
  bounded: {
    title: "m-frame with bounds",
    description: "This example shows how an m-frame's contents can be bounded to a specific volume",
    code: bounds,
  },
};
