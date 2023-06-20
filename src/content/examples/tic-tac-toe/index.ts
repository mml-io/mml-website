import { Example } from "@/types/example";

export const ticTacToe: Example = {
  name: "Tic Tac Toe",
  description: "A simple game of tic tac toe",
  image: "/images/examples/tic-tac-toe.png",
  code: `<html>
  <body>
    <!-- Scene -->
<m-light
type="point"
intensity="1"
x="0"
y="12"
z="30"
rx="10"
rz="-10"
debug="true"
  ></m-light>

  <m-group id="board" z="-20" y="3">
  <m-label id="winner" width="22" y="-5" height="5" content="" font-size="200" alignment="center"></m-label>

  <!--  horizontal lines -->
  <m-cube id="line-horizontal-1" width="22" z="1" y="21.5" color="black"></m-cube>
  <m-cube id="line-horizontal-2" width="22" z="1" y="14.5" color="black"></m-cube>
  <m-cube id="line-horizontal-3" width="22" z="1" y="7.5" color="black"></m-cube>
  <m-cube id="line-horizontal-4" width="22" z="1" y="0.5" color="black"></m-cube>

  <!--  vertical lines -->
  <m-cube id="line-vertical-1" height="22" z="1" x="-10.5" y="11" color="black"></m-cube>
  <m-cube id="line-vertical-2" height="22" z="1" x="-3.5" y="11" color="black"></m-cube>
  <m-cube id="line-vertical-3" height="22" z="1" x="3.5" y="11" color="black"></m-cube>
  <m-cube id="line-vertical-4" height="22" z="1" x="10.5" y="11" color="black"></m-cube>

  <!--  interactive cubes -->
  <!--  first row -->
  <m-cube id="cell-1" width="6" height="6" x="-7" y="18" z="0.5" visible="false"></m-cube>
  <m-cube id="cell-2" width="6" height="6" x="0" y="18" z="0.5" visible="false"></m-cube>
  <m-cube id="cell-3" width="6" height="6" x="7" y="18" z="0.5" visible="false"></m-cube>

  <!--  second row -->
  <m-cube id="cell-4" width="6" height="6" x="-7" y="11" z="0.5" visible="false"></m-cube>
  <m-cube id="cell-5" width="6" height="6" x="0" y="11" z="0.5" visible="false"></m-cube>
  <m-cube id="cell-6" width="6" height="6" x="7" y="11" z="0.5" visible="false"></m-cube>

  <!--  third row -->
  <m-cube id="cell-7" width="6" height="6" x="-7" y="4" z="0.5" visible="false"></m-cube>
  <m-cube id="cell-8" width="6" height="6" x="0" y="4" z="0.5" visible="false"></m-cube>
  <m-cube id="cell-9" width="6" height="6" x="7" y="4" z="0.5" visible="false"></m-cube>
  </m-group>

  <script>
// Create tic-tac-toe board status
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const label = document.querySelector("#winner");

// Track current player
let currentPlayer = "X";

const setMove = (selectedCell) => {
  const { attributes } = selectedCell;

  // create html element
  const label = document.createElement("m-label");
  label.setAttribute("content", currentPlayer);
  label.setAttribute("width", "6");
  label.setAttribute("y", attributes.y.value);
  label.setAttribute("x", attributes.x.value);
  label.setAttribute("z", "1");
  label.setAttribute("font-size", "450");
  label.setAttribute("height", "6");
  label.setAttribute("color", "#ffffff");
  label.setAttribute("alignment", "center");

  // add to scene
  document.querySelector("#board").appendChild(label);
}

// Function to update board status
function updateBoard(x, y, player) {
  board[y][x] = player;
}

// Function to check for a win
function checkForWin() {
  const winConditions = [
    [[0, 0], [1, 0], [2, 0]], // rows
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [0, 1], [0, 2]], // columns
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 1], [2, 2]], // diagonals
    [[0, 2], [1, 1], [2, 0]],
  ];

  return winConditions.some(condition =>
    condition.every(([x, y]) => board[y][x] === currentPlayer)
  );
}

// Add click event listeners to cubes
for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    const cell = document.getElementById(\`cell-\${y * 3 + x + 1}\`);
    cell.addEventListener("click", () => {
      console.log(cell.attributes.id.value)
      if (board[y][x] === "") {
        // Update board status
        updateBoard(x, y, currentPlayer);
        setMove(cell)

        // Visualize move
        cell.textContent = currentPlayer;

        // Check for win
        if (checkForWin()) {
          label.setAttribute("content", \`\${currentPlayer} wins!\`);
          return;
        }

        // Switch players
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  }
}
</script>
</body>
</html>
`,
};
