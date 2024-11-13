import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHammer, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

const HomepageLinkCollection = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/mml-io/mml",
      icon: faGithub,
    },
    {
      name: "Discord",
      url: "https://discord.gg/msquared",
      icon: faDiscord,
    },
    {
      name: "MML Editor",
      url: "https://mmleditor.com",
      icon: faHammer,
    },
    {
      name: "Explore MML Creations",
      url: "https://mmleditor.com/explore",
      icon: faCompass,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full py-6">
        <a
          href="https://guided-tour-9709e5_world-7599b2.mml.world"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-3 px-6 py-2 rounded-full bg-hero-link-bg text-xl text-grey hover:bg-hero-link-bg-hover hover:text-lightgrey focus:outline-none focus:ring-2 focus:ring-[blue] transition-colors ease-in-out"
        >
          <FontAwesomeIcon icon={faPlay} className="mr-3" />
          Play the MML Guided Tour
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 rounded-full bg-hero-link-bg text-grey hover:bg-hero-link-bg-hover hover:text-lightgrey focus:outline-none focus:ring-2 focus:ring-[blue] transition-colors ease-in-out"
          >
            <FontAwesomeIcon icon={link.icon} className="mr-2" />
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
};

export default HomepageLinkCollection;
