import { BlogPost } from "@/types/blog-post";

import body from "./body.mdx";

const introducingMml: BlogPost = {
  title: "AI-Powered NPC with MML",
  description: "How to create an MML NPC powered by OpenAI in your virtual world.",
  date: "2024-11-05",
  body,
  image: "/images/blog/ai-powered-npc.jpg",
  linkList: [
    "Create an OpenAI Assistant",
    "Configure your Assistant",
    "Creating your NPC MML Document",
    "The requests queue",
    "Submitting Messages to the Queue",
    "Processing the Queue",
    "Sending Messages to OpenAI",
    "Handling the AI Response",
    "Text-to-Speech: Giving Voice to your NPC",
    "Handling Timeout with Speech Generation",
    "Playing the Audio",
    "Processing the Audio Response Queue",
    "Animating and Bringing the NPC to Life",
    "Proximity Detection and State Reset",
    "Listening for Chat Messages",
  ],
};

export default introducingMml;
