import { DocsExamples } from "@/types/docs-reference";

import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Model",
    description: "This is a basic M-Model.",
    code: primary,
  },
  "scale-example": {
    title: "Scale",
    description: "This is a M-Model with scale.",
    code: scale,
  },
  "position-example": {
    title: "Position",
    description: "This is a M-Model with position.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a M-Model with rotation.",
    code: rotation,
  },
};
