import { DocsExamples } from "@/types/docs-reference";

import animation from "./animation.mml";
import primary from "./primary.mml";
import socket from "./socket.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-character",
    description: "This is a basic m-character.",
    code: primary,
  },
  "animation-example": {
    title: "Animation Example",
    description: "This is an example of an animated m-character.",
    code: animation,
  },
  socket: {
    title: "Socket Example",
    description: "This is an example of how an m-model can be socketed to an m-character.",
    code: socket,
  },
};
