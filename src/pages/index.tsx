import * as React from "react";

import ScrollUp from "@/src/components/Common/ScrollUp";
import FooterCTA from "@/src/components/Landing/FooterCTA";
import LandingHero from "@/src/components/Landing/Hero";
import HowItWorks from "@/src/components/Landing/HowItWorks";
import StarterGrid from "@/src/components/Landing/StarterGrid";
import PageMeta from "@/src/components/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="MML - Metaverse Markup Language"
        description="MML is an open source ecosystem for building multi-user interactive 3D experiences on the web, including the MML markup language and the 3D Web Experience framework."
        path="/"
        noSuffix
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "MML - Metaverse Markup Language",
            url: "https://mml.io",
            description:
              "MML is an open source ecosystem for building multi-user interactive 3D experiences on the web, including the MML markup language and the 3D Web Experience framework.",
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "MML",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: "https://mml.io",
            offers: { "@type": "Offer", price: "0" },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How MML Works",
            description:
              "MML brings the ease of HTML to shared 3D experiences. A visual breakdown of the underlying mechanics.",
            step: [
              {
                "@type": "HowToStep",
                name: "The Networked DOM",
                text: "In MML, the Document Object Model (DOM) lives on the server, not the user's device. This single source of truth continuously synchronizes state to all connected clients. When a new user joins, they immediately receive the current state of the content.",
              },
              {
                "@type": "HowToStep",
                name: "Event Propagation Loop",
                text: "Interaction is handled authoritatively. When a user clicks an object, the event is sent to the server script. The server processes the logic, updates the document, and broadcasts the change to everyone simultaneously.",
              },
              {
                "@type": "HowToStep",
                name: "Markup to 3D Content",
                text: "MML uses familiar HTML-like tags to define 3D objects. This approach works for both simple and extremely complex 3D scenes. The MML client has been implemented in multiple game engines/renderers including ThreeJS, Unreal Engine, and PlayCanvas.",
              },
            ],
          },
        ]}
      />
      <ScrollUp />
      <LandingHero />
      <HowItWorks />
      <StarterGrid />
      <FooterCTA />
    </>
  );
}
