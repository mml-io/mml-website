import { DocsExamples } from "@/types/docs-reference";

import eventListener from "./event-listener.mml";
import onclick from "./onclick.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-sphere",
    description: "This is a basic m-sphere.",
    code: primary,
  },
  "onclick-example": {
    title: "onclick",
    description: "Click the sphere to change its color via the script in `onclick`.",
    code: onclick,
  },
  "event-listener-example": {
    title: "event-listener",
    description:
      "Click the sphere to change its color via the function added by `addEventListener`.",
    code: eventListener,
  },
  "scale-example": {
    title: "scale",
    description: "This is a basic m-sphere with scale properties.",
    code: scale,
  },
  "position-example": {
    title: "position",
    description: "This is a basic m-sphere with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "rotation",
    description: "This is a basic m-sphere with rotation properties.",
    code: rotation,
  },
};
