import { DocsExamples } from "@/types/docs-reference";

import dimension from "./dimension.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-plane",
    description: "This is a basic m-plane.",
    code: primary,
  },
  "dimension-example": {
    title: "Dimension",
    description: "This is a basic m-plane with dimension properties.",
    code: dimension,
  },
  "position-example": {
    title: "Position",
    description: "This is a basic m-plane with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a basic m-plane with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "Scale",
    description: "This is a basic m-plane with scale properties.",
    code: scale,
  },
};
