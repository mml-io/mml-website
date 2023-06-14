import { DocsExamples } from "@/types/docs-reference";

import dimension from "./dimension.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import singleDimension from "./single-dimension.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Image",
    description: "This is a basic M-Image.",
    code: primary,
  },
  "dimensions-example": {
    title: "Size",
    description: "This is a M-Image example with dimension.",
    code: dimension,
  },
  "transform-example": {
    title: "Transform",
    description: "This is a M-Image example with position.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a M-Image example with rotation.",
    code: rotation,
  },
  "single-dimension-example": {
    title: "Single Dimension",
    description:
      "When specifying a single dimension, the image will keep its original aspect ratio.",
    code: singleDimension,
  },
};
