import { DocsExamples } from "@/types/docs-reference";

import dimensions from "./dimensions.mml";
import eventListener from "./event-listener.mml";
import onclick from "./onclick.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-cube",
    description: "This is a basic m-cube.",
    code: primary,
  },
  "onclick-example": {
    title: "onclick",
    description: "Click the cube to change its color via the script in `onclick`.",
    code: onclick,
  },
  "event-listener-example": {
    title: "eventListener",
    description: "Click the cube to change its color via the function added by `addEventListener`.",
    code: eventListener,
  },
  "dimensions-example": {
    title: "Dimensions",
    description: "This is a basic m-cube with dimension properties.",
    code: dimensions,
  },
  "position-example": {
    title: "Position",
    description: "This is a basic m-cube with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a basic m-cube with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "Scale",
    description: "This is a basic m-cube with scale properties.",
    code: scale,
  },
};
