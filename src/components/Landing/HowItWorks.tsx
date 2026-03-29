import * as React from "react";

import { InteractionLoopDiagram } from "@/src/components/Landing/diagrams/InteractionLoopDiagram";
import { MarkupToWorldDiagram } from "@/src/components/Landing/diagrams/MarkupToWorldDiagram";
import { NetworkedDomDiagram } from "@/src/components/Landing/diagrams/NetworkedDomDiagram";
import { DiagramWrapper } from "@/src/components/Landing/DiagramWrapper";

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-transparent border-b border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How MML Works</h2>
          <p className="text-secondary dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            MML brings the ease of HTML to shared 3D experiences. Here is a visual breakdown of the
            underlying mechanics.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <DiagramWrapper
            step={1}
            title="The Networked DOM"
            description="In MML, the Document Object Model (DOM) lives on the server, not the user's device. This single source of truth continuously synchronizes state to all connected clients. When a new user joins, they immediately receive the current state of the content."
          >
            <NetworkedDomDiagram />
          </DiagramWrapper>

          <DiagramWrapper
            step={2}
            title="Event Propagation Loop"
            description="Interaction is handled authoritatively. When a user clicks an object, the event is sent to the server script. The server processes the logic, updates the document, and broadcasts the change to everyone simultaneously."
          >
            <InteractionLoopDiagram />
          </DiagramWrapper>

          <DiagramWrapper
            step={3}
            title="Markup to 3D Content"
            description="MML uses familiar HTML-like tags to define 3D objects. This approach works for both simple and extremely complex 3D scenes. The MML client has been implemented in multiple game engines/renderers including ThreeJS, Unreal Engine, and PlayCanvas."
          >
            <MarkupToWorldDiagram />
          </DiagramWrapper>
        </div>
      </div>
    </section>
  );
}
