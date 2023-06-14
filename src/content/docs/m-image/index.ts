import { DocsExamples } from "@/types/docs-reference";

import dimension from "./dimension.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import singleDimension from "./single-dimension.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-image",
    description: "This is a basic m-image.",
    code: primary,
  },
  "dimensions-example": {
    title: "Dimensions",
    description: "This is a m-image example with dimension properties.",
    code: dimension,
  },
  "transform-example": {
    title: "Position",
    description: "This is a m-image example with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a m-image example with rotation properties.",
    code: rotation,
  },
  "single-dimension-example": {
    title: "Single Dimension",
    description:
      "When specifying a single dimension, the image will keep its original aspect ratio.",
    code: singleDimension,
  },
};
