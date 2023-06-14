import { basicExample } from "@/src/content/examples/basic";
import { clockExample } from "@/src/content/examples/clock";
import { lotsOfCubesExample } from "@/src/content/examples/lots-of-cubes";
import { lotsOfSpheresExample } from "@/src/content/examples/lots-of-spheres";

export const examples = {
  [basicExample.name]: basicExample,
  [lotsOfCubesExample.name]: lotsOfCubesExample,
  [lotsOfSpheresExample.name]: lotsOfSpheresExample,
  [clockExample.name]: clockExample,
};
