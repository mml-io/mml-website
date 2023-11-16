import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

import disconnected from "./disconnected.mml";
import primary from "./primary.mml";
import visibleTo from "./visible-to.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic connection event",
    description: "A label that shows the client ids that have connected.",
    code: primary,
    clients: [CLIENT_TYPES.FLOATING, CLIENT_TYPES.FLOATING],
  },
  test: {
    title: "Basic disconnection event",
    description: "A label that shows the client ids that have disconnected.",
    code: disconnected,
    clients: [CLIENT_TYPES.FLOATING, CLIENT_TYPES.FLOATING],
  },
  visibleTo: {
    title: "Visible to event",
    description: "A label that shows only the client id of one specific client",
    code: visibleTo,
    clients: [CLIENT_TYPES.FLOATING, CLIENT_TYPES.FLOATING],
  },
};
