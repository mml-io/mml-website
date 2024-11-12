import { BlogPost } from "@/types/blog-post";

import body from "./body.mdx";

const introducingMml: BlogPost = {
  title: "Live Streaming to the Metaverse",
  description: "An easy way to have your live event in the Metaverse.",
  date: "2024-11-04",
  body,
  image: "/images/blog/live-stream-to-the-metaverse.jpg",
  linkList: [
    "Sign up for a Cloudflare Stream account",
    "Pick a Cloudflare Stream plan",
    "Create your first Live Input",
    "Configure your Live Input",
    "Configure your Streaming Software (OBS)",
    "Composing your MML document",
  ],
};

export default introducingMml;
