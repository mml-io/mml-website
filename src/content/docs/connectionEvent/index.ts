import { DocsExamples } from "@/types/docs-reference";

import disconnected from "./disconnected.mml";
import primary from "./primary.mml";
import visibleTo from "./visible-to.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic connection event",
    description: "A label that shows the client ids that have connected.",
    code: primary,
    clientsNumber: 2,
    showClientsControls: true,
  },
  test: {
    title: "Basic disconnection event",
    description: "A label that shows the client ids that have disconnected.",
    code: disconnected,
    clientsNumber: 2,
    showClientsControls: true,
  },
  visibleTo: {
    title: "Visible to event",
    description: "A label that shows only the client id of one specific client",
    code: visibleTo,
    clientsNumber: 2,
    showClientsControls: true,
  },
};
