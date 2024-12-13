import { BlogPostsByName } from "@/types/blog-post";

import aiPoweredNPC from "./ai-powered-npc";
import aug2023 from "./aug-2023";
import introducingMml from "./introducing-mml";
import liveStreamToTheMetaverse from "./live-stream-to-the-metaverse";

export const posts: BlogPostsByName = {
  "ai-powered-npc": aiPoweredNPC,
  "live-stream-to-the-metaverse": liveStreamToTheMetaverse,
  "aug-2023": aug2023,
  "introducing-mml": introducingMml,

  // Leaving this here to show how multiple posts appear on the page
  // "introducing-mml2": introducingMml,
  // "introducing-mml3": introducingMml,
  // "introducing-mml4": introducingMml,
};
