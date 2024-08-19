import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type FeatureData = {
  title: string;
  description: React.ReactNode;
  imgSrc: string;
};

const FeatureItem = ({ feature, index }: { feature: FeatureData; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isOdd = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`mb-20 flex flex-col md:flex-row items-center my-8 transition duration-1000 ease-in-out shadow-xl transform ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-12"
      } ${
        isOdd
          ? "bg-[radial-gradient(50%_100%_at_25%_25%,_rgb(189_189_189_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)] dark:bg-[radial-gradient(50%_100%_at_25%_25%,_rgb(130_130_130_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)] md:flex-row-reverse"
          : "bg-[radial-gradient(50%_100%_at_75%_75%,_rgb(189_189_189_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)] dark:bg-[radial-gradient(50%_100%_at_75%_75%,_rgb(130_130_130_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)]"
      }`}
    >
      {feature.imgSrc.endsWith(".webm") ? (
        <video
          className="w-full md:w-1/2 max-h-96 md:h-120 object-contain p-4 md:p-2 rounded-lg"
          src={feature.imgSrc}
          autoPlay
          loop
          muted
          playsInline
          alt={feature.title}
        />
      ) : (
        <img
          className="w-full md:w-1/2 max-h-96 md:h-120 object-contain p-4 md:p-2 rounded-lg"
          src={feature.imgSrc}
          alt={feature.title}
        />
      )}
      <div className="md:w-1/2 md:px-8 p-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">{feature.title}</h2>
        <div className="mt-2 md:mt-4 text-lg md:text-xl text-gray-500">{feature.description}</div>
      </div>
    </div>
  );
};

const Features = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const features = [
    {
      title: "Use familiar and powerful web technologies",
      description: (
        <>
          <p>Use familiar tools, frameworks, and even call APIs. </p>
          <br />
          <p>Creating multi-user, interactive content is just like building a web page.</p>
        </>
      ),
      imgSrc:
        theme === "dark" ? "/images/homepage/html-js-dark.svg" : "/images/homepage/html-js.svg",
    },
    {
      title: "MML documents run on a server and multiple users connect at once",
      description: (
        <>
          <p>
            Multiple users connect using websockets to the equivalent of a live, interactive web
            page representing 3D objects.
          </p>
          <br />
          <p>
            Users' interactions are received by the server and can trigger the content to update
            which is then synchronized for all to see.
          </p>
        </>
      ),
      imgSrc:
        theme === "dark"
          ? "/images/homepage/how-mml-works-dark.webm"
          : "/images/homepage/how-mml-works.webm",
    },
    {
      title: "Interoperability across multiple game engines, web, and AR",
      description: (
        <>
          <p>
            As the HTML & JavaScript is being run separately on a server, the content is
            interoperable across multiple game engines and form factors, even allowing different
            engines to interact with the same document at the same time.
          </p>
        </>
      ),
      imgSrc:
        theme === "dark" ? "/images/homepage/interop-dark.svg" : "/images/homepage/interop.svg",
    },
    {
      title: "Open Source",
      description: (
        <>
          <p>The MML libraries are open-source and can be hosted however you like</p>
          <br />
          <p>There are services such as MServe that can host MML and also 3D web worlds.</p>
        </>
      ),
      imgSrc: "/images/homepage/open-source.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} index={index} />
      ))}
    </div>
  );
};

export default Features;
