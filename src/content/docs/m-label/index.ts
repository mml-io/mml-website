import { DocsExamples } from "@/types/docs-reference";

import dimension from "./dimension.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Label",
    description: "This is a basic M-Label example.",
    code: primary,
  },
  "dimension-example": {
    title: "M-Label Dimension",
    description: "This is an M-Label example with different dimensions.",
    code: dimension,
  },
  "transform-example": {
    title: "M-Label Transform",
    description: "This is an M-Label example with a position.",
    code: position,
  },
  "rotation-example": {
    title: "M-Label Rotation",
    description: "This is an M-Label example with a rotation.",
    code: rotation,
  },
};
