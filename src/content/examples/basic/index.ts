import { Example } from "@/types/example";

export const basicExample: Example = {
  name: "Basic Scene",
  description: "A basic scene with models and cubes",
  code: `<!-- Battle Damaged Sci-fi Helmet - PBR by theblueturtle_
https://sketchfab.com/models/b81008d513954189a063ff901f7abfe4 -->
<m-model x="-2" collide="true" src="https://public.mml.io/damaged-helmet.glb" z="-2" y="1.2" sx="0.5" sy="0.5" sz="0.5"></m-model>

<m-cube id="clickable-cube" y="1" color="red" collide="true" z="-2"></m-cube>

<m-model x="2" z="-2" id="duck" hidden-from="2" src="https://public.mml.io/duck.glb" y="0.37872010769124587" collide="true"></m-model>

<m-cube id="color-cube" x="4" y="1" width="1" color="green" collide="true" z="-2" castshadow="true"></m-cube>

<script>
  const clickableCube = document.getElementById("clickable-cube");
  clickableCube.addEventListener("click", () => {
    clickableCube.setAttribute("color", \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`);
  });

  const duck = document.getElementById("duck");
  if (duck) {
    setInterval(() => {
      duck.setAttribute("ry", (new Date().getTime() / 5) % 360);
    }, 100);
  }
</script>`,
  image: "/images/examples/basic.png",
};
