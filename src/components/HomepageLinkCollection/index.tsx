import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  ];

  return (
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
  );
};

export default HomepageLinkCollection;
