import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { guides } from "@/src/content/guides";

export default function GuideNavigation() {
  const route = useRouter();
  const guideId = route.query["guide-id"] as string;

  const selectedStyle =
    "bg-[#0581DC19] border-l-[#0581DC] border-l-2 text-black dark:text-white pl-4";

  return (
    <nav className="fixed left-10 hidden xl:block xl:w-[150px] 2xl:w-[300px]">
      <p className="mb-2 font-semibold">Guides</p>
      <ul>
        {Object.entries(guides).map((guide) => {
          const [name] = guide;
          const isSelected = name === guideId;

          return (
            <li
              key={name}
              className={`flex h-[36px] w-full items-center text-sm ${isSelected && selectedStyle}`}
            >
              <Link href={`/docs/guides/${name}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
