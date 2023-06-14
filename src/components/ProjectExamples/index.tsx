import Link from "next/link";

import { examples } from "@/src/content/examples";

import SectionTitle from "../Common/SectionTitle";

const Examples = () => {
  return (
    <>
      <section id="features" className=" py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle title="Examples" paragraph="" center mb="40px" />

          <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(examples).map(([id, { image, name }], index) => (
              <Link href={`/examples/?example=${id}`} key={index}>
                <img className="w-full" src={image} key={index} alt={name} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Examples;
