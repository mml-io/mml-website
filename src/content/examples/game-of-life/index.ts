import { Example } from "@/types/example";

export const gameOfLifeExample: Example = {
  name: "game-of-life",
  description: "Conway's Game of Life",
  code: `
<script>
  const parent = document.getElementsByTagName("m-group")[0];
  let world = [];
  const worldSize = 20,
    cellSize = 0.5;

  for (let x = 0; x < worldSize; x++) {
    world[x] = [];
    for (let y = 0; y < worldSize; y++) {
      world[x][y] = Math.random() < 0.25 ? 1 : 0;
      if (world[x][y]) createCube(x, y);
    }
  }

  function createCube(x, y) {
    const cube = document.createElement("m-cube");
    cube.setAttribute("x", (x - worldSize / 2) * cellSize);
    cube.setAttribute("y", y * cellSize);
    cube.setAttribute("z", 0);
    cube.setAttribute("color", "skyblue");
    cube.setAttribute("id", x + ":" + y);
    document.body.appendChild(cube);
  }

  function update() {
    const newWorld = [];

    for (let x = 0; x < worldSize; x++) {
      newWorld[x] = [];
      for (let y = 0; y < worldSize; y++) {
        const nn = countNeighbours(x, y);
        const alive = world[x][y] === 1;

        if (alive && (nn < 2 || nn > 3)) {
          newWorld[x][y] = 0;
        } else if (!alive && nn === 3) {
          newWorld[x][y] = 1;
        } else {
          newWorld[x][y] = world[x][y];
        }

        if (newWorld[x][y]) {
          if (!alive) createCube(x, y);
        } else if (alive) document.getElementById(x + ":" + y).remove();
      }
    }

    world = newWorld;
  }

  function countNeighbours(x, y) {
    let count = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + worldSize) % worldSize;
        const ny = (y + dy + worldSize) % worldSize;
        count += world[nx][ny];
      }
    }
    return count;
  }

  window.setInterval(update, 200);
</script>`,
  image: "/images/examples/gol.png",
};
