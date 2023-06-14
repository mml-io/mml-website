import { DocsExamples } from "@/types/docs-reference";

import animation from "./animation.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Character",
    description: "This is a basic M-Character.",
    code: primary,
  },
  "animation-example": {
    title: "Animation Example",
    description: "This is an example of an animated M-Character.",
    code: animation,
  },
  "position-example": {
    title: "Position Example",
    description: "This is an example of an M-Character with a position.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation Example",
    description: "This is an example of an M-Character with a rotation.",
    code: rotation,
  },
  "scale-example": {
    title: "Scale Example",
    description: "This is an example of an M-Character with a scale.",
    code: scale,
  },
};
