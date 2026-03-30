import { faGithub, faNpm } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as React from "react";

import { DeltaNetDiagram } from "@/src/components/3dWebExperience/DeltaNetDiagram";
import { FullStackDiagram } from "@/src/components/3dWebExperience/FullStackDiagram";
import ExampleView from "@/src/components/ExampleView/DocsExampleViewDynamic";
import { DiagramWrapper } from "@/src/components/Landing/DiagramWrapper";
import PageMeta from "@/src/components/PageMeta";
import { CLIENT_TYPES } from "@/types/docs-reference";


const demoCode = `<m-model src="/assets/museum.glb" x="-20" z="2" sx="20" sy="20" sz="20"></m-model>
<m-light type="point" y="10" intensity="100"></m-light>
<m-cube id="cube1" color="red" x="-3" y="1.5" z="-5">
  <m-attr-anim attr="ry" start="0" end="360" duration="5000"></m-attr-anim>
</m-cube>
<m-cube id="cube2" color="green" x="3" y="1.5" z="-5">
  <m-attr-anim attr="ry" start="0" end="360" duration="5000"></m-attr-anim>
</m-cube>
<m-group id="stairs" ry="180" y="0.1"></m-group>
<script>
  const colors = ["red", "green", "blue", "orange", "purple", "cyan", "yellow"];
  document.querySelectorAll("#cube1, #cube2").forEach(cube => {
    cube.addEventListener("click", () => {
      cube.setAttribute("color", colors[Math.floor(Math.random() * colors.length)]);
    });
  });

  const stairs = document.getElementById("stairs");

  function getHexForCurrentTime(lightness) {
    const hue = ((Date.now() % 2000)/2000) * 360;
    const saturation = 1.0;
    const alpha = saturation * Math.min(lightness, 1 - lightness);
    const getF = number => {
      const k = (number + hue / 30) % 12;
      return lightness - alpha * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
    };
    const red = Math.round(255 * getF(0));
    const green = Math.round(255 * getF(8));
    const blue = Math.round(255 * getF(4));
    const hex = "#"+(red.toString(16).padStart(2, "0"))+(green.toString(16).padStart(2, "0"))+(blue.toString(16).padStart(2, "0"));
    return hex;
  }

  for (let i = 0; i < 15; i++) {
    const stair = document.createElement("m-cube");
    stair.setAttribute("z", i * 0.5);
    stair.setAttribute("y", i * 0.2);
    stair.setAttribute("width", 2);
    stair.setAttribute("height", 0.2);
    stair.setAttribute("depth", 0.5);
    stair.setAttribute("color", "blue");
    stair.setAttribute("collision-interval","1000");
    stair.addEventListener("collisionstart", () => {
      stair.setAttribute("color", "white");
    });
    stair.addEventListener("collisionend", () => {
      stair.setAttribute("color", getHexForCurrentTime(0.5));
    });
    stairs.append(stair);
  }
</script>`;

export default function ThreeDWebExperience() {
  return (
    <>
      <PageMeta
        title="3D Web Experience"
        description="Open source multiplayer framework for building shared 3D environments in the browser with avatars, real-time networking, and MML support."
        path="/3d-web-experience"
      />

      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">3D Web Experience</h1>
          <p className="text-lg text-secondary dark:text-slate-300 mb-6 max-w-2xl leading-relaxed">
            Open source multiplayer framework for shared 3D environments in the browser. Avatars,
            real-time networking, and{" "}
            <Link href="/docs" className="text-link-text dark:text-link-text-dark hover:underline">
              MML
            </Link>{"."}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/mml-io/3d-web-experience"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/org/mml-io"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <FontAwesomeIcon icon={faNpm} className="h-4 w-4" />
              npm
            </a>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="card overflow-hidden" style={{ height: 600 }}>
            <ExampleView
              code={demoCode}
              initialClients={[CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR]}
              usernames={["Alice", "Bob"]}
              description="3D Web Experience multiplayer demo"
              noBorders
              loadingScreenConfig={{
                title: "3D Web Experience",
                subtitle: "Powered by MML",
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                color: "#ffffff",
              }}
            />
          </div>
          <p className="text-sm text-secondary dark:text-slate-400 mt-3">
            WASD to move. Click cubes to change color. Edit the MML on the left.
            This demo runs entirely in your browser — the same library that powers
            networked multiplayer servers also works standalone, with no backend required.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-slate-50 dark:bg-transparent border-t border-black/5 dark:border-white/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Architecture</h2>
            <p className="text-secondary dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Two independent networking systems run in parallel: DeltaNet for real-time
              multiplayer presence, and the Networked DOM for synchronized MML content.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <DiagramWrapper
              step={1}
              title="Full Stack"
              description="The server orchestrates two distinct channels. DeltaNet handles high-frequency position and state updates for every connected user. The Networked DOM synchronizes MML document state — interactive 3D content that all users see and can manipulate together."
            >
              <FullStackDiagram />
            </DiagramWrapper>

            <DiagramWrapper
              step={2}
              title="DeltaNet Protocol"
              description="Rather than sending absolute positions each tick, DeltaNet encodes the change in change — second-order deltas that are almost always zero for moving users. These tiny values pack into single bytes and compress well, achieving a 20:1 reduction over the wire."
            >
              <DeltaNetDiagram />
            </DiagramWrapper>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 md:py-24 border-t border-black/5 dark:border-white/5">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Getting Started</h2>
          <div className="bg-editor-bg rounded-xl p-5 font-mono text-sm text-slate-200 overflow-x-auto border border-white/5 space-y-3">
            <div>
              <div className="text-slate-500 select-none mb-0.5"># Scaffold a project</div>
              <div>
                <span className="text-mml-400 select-none">$ </span>npx @mml-io/3d-web-experience init
                my-world
              </div>
            </div>
            <div>
              <div className="text-slate-500 select-none mb-0.5"># Start the server</div>
              <div>
                <span className="text-mml-400 select-none">$ </span>cd my-world
              </div>
              <div>
                <span className="text-mml-400 select-none">$ </span>npx @mml-io/3d-web-experience serve
                world.json
              </div>
            </div>
            <div>
              <div className="text-slate-500 select-none">
                # Open http://localhost:8080 - use multiple tabs for multi-user
              </div>
            </div>
          </div>
          <p className="text-secondary dark:text-slate-400 text-sm mt-4">
            Drop MML documents in{" "}
            <code className="text-sm bg-code-bg dark:bg-code-bg-dark px-1.5 py-0.5 rounded">
              mml-documents/
            </code>{" "}
            and add them to the{" "}
            <code className="text-sm bg-code-bg dark:bg-code-bg-dark px-1.5 py-0.5 rounded">
              world.json
            </code>{" "}
            file to add interactive 3D content. 
            {" "}
            <a
              href="https://github.com/mml-io/3d-web-experience/tree/main/example"
              target="_blank"
              rel="noreferrer"
              className="text-link-text dark:text-link-text-dark hover:underline"
            >
              Examples on GitHub
            </a>
          </p>
        </div>
      </section>

    </>
  );
}
