import moveCheck from "@/src/content/docs/mmlCollisionMoveEvent/move-check.mml";
import movingObject from "@/src/content/docs/mmlCollisionMoveEvent/moving-object.mml";
import primary from "@/src/content/docs/mmlCollisionMoveEvent/primary.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Collision move event",
    description: "The label shows the position of the user moving on the platform.",
    code: primary,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR],
  },
  moveCheck: {
    title: "Move check",
    description: "The platform changes color only if the user is actually moving.",
    code: moveCheck,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR],
  },
  movingObject: {
    title: "Moving object",
    description: "The position of several users is projected on the wall behind them.",
    code: movingObject,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
  },
};
