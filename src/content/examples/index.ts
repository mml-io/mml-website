import { basicExample } from "@/src/content/examples/basic";
import { clockExample } from "@/src/content/examples/clock";
import { diceExample } from "@/src/content/examples/dice";
import { gameOfLifeExample } from "@/src/content/examples/game-of-life";
import { videoPlayerExample } from "@/src/content/examples/videoplayer";
import { weatherExample } from "@/src/content/examples/weather";

export const examples = {
  [basicExample.name]: basicExample,
  [diceExample.name]: diceExample,
  [videoPlayerExample.name]: videoPlayerExample,
  [weatherExample.name]: weatherExample,
  [clockExample.name]: clockExample,
  [gameOfLifeExample.name]: gameOfLifeExample,
};
