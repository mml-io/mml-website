import { DocsExamples } from "@/types/docs-reference";

import dimension from "./dimension.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Plane",
    description: "This is a basic M-Plane.",
    code: primary,
  },
  "dimension-example": {
    title: "Dimension",
    description: "This is a basic M-Plane with a dimension.",
    code: dimension,
  },
  "position-example": {
    title: "Position",
    description: "This is a basic M-Plane with a position.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a basic M-Plane with a rotation.",
    code: rotation,
  },
  "scale-example": {
    title: "Scale",
    description: "This is a basic M-Plane with a scale.",
    code: scale,
  },
};
