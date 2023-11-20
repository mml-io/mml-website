import multipleUsers from "@/src/content/docs/mmlCollisionStartEvent/multiple-users.mml";
import position from "@/src/content/docs/mmlCollisionStartEvent/position.mml";
import primary from "@/src/content/docs/mmlCollisionStartEvent/primary.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Collision start event",
    description: "The label shows the connection id of the user colliding with the platform.",
    code: primary,
    clients: [CLIENT_TYPES.AVATAR],
    baseSceneOn: false,
  },
  multipleUsers: {
    title: "Multiple users",
    description: "The label shows the connection id of the users who collided with the platform.",
    code: multipleUsers,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
    baseSceneOn: false,
  },
  position: {
    title: "Position",
    description: "The label shows the position of the collision event.",
    code: position,
    clients: [CLIENT_TYPES.AVATAR],
    baseSceneOn: false,
  },
};
