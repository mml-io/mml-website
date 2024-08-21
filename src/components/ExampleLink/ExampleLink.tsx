import Link from "next/link";
import * as React from "react";

export function ExampleLink({
  exampleId,
  image,
  name,
  description,
  isSelected,
}: {
  exampleId: string;
  image: string;
  name: string;
  description: string;
  isSelected: boolean;
}) {
  return (
    <Link
      className={`block border-box rounded mt-4 cursor-pointer bg-[radial-gradient(50%_100%_at_75%_75%,_rgb(209_209_209_/_40%)_0%,_rgba(0,_0,_0,_0.24)_150%)] dark:bg-[radial-gradient(50%_100%_at_75%_75%,_rgb(130_130_130_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)] xl:h-[225px] overflow-hidden ${
        isSelected ? "shadow-[0_0px_0px_2px_rgba(255,255,255,1)]" : "shadow-lg"
      }`}
      href={`/examples/?example=${exampleId}`}
    >
      <div className="relative aspect-[1.60738255] h-[181px] w-full overflow-hidden">
        <img className="absolute top-1/2 w-full -translate-y-1/2" src={image} alt={name} />
        <div className="hover absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-transparent text-2xl font-medium text-white text-opacity-0 hover:bg-[#00000080] hover:text-opacity-100 shadow-xl">
          See example
        </div>
      </div>
      <p className="mt-3 px-4 text-sm font-medium">{description}</p>
    </Link>
  );
}
