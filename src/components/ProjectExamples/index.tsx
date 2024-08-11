import Link from "next/link";

import { examples } from "@/src/content/examples";

import SectionTitle from "../Common/SectionTitle";

const Examples = () => {
  return (
    <>
      <section id="features" className="mb-16">
        <div className="container">
          <SectionTitle title="Examples" paragraph="" center mb="40px" />

          <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(examples).map(([id, { image, name }], index) => (
              <Link href={`/examples/?example=${id}`} key={index} className="relative">
                <div className="relative aspect-[1.60738255] h-full w-full overflow-hidden rounded">
                  <img
                    className="absolute top-1/2 w-full -translate-y-1/2"
                    src={image}
                    key={index}
                    alt={name}
                  />
                </div>
                <div className="hover absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-transparent text-2xl font-medium text-white text-opacity-0 hover:bg-[#00000080] hover:text-opacity-100">
                  See example
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Examples;
