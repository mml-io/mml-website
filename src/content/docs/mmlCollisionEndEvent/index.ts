import multipleUsers from "@/src/content/docs/mmlCollisionEndEvent/multiple-users.mml";
import primary from "@/src/content/docs/mmlCollisionEndEvent/primary.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Collision end event",
    description:
      "The label shows the connection id of the user who stopped colliding with the platform.",
    code: primary,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR],
  },
  multipleUsers: {
    title: "Multiple users",
    description:
      "The label shows the connection id of the users who stopped colliding with the platform.",
    code: multipleUsers,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
  },
};
