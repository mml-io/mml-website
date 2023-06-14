import { DocsExamples } from "@/types/docs-reference";

import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-model",
    description: "This is a basic m-model.",
    code: primary,
  },
  "scale-example": {
    title: "Scale",
    description: "This is an m-model with scale properties.",
    code: scale,
  },
  "position-example": {
    title: "Position",
    description: "This is an m-model with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is an m-model with rotation properties.",
    code: rotation,
  },
};
