import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { guides } from "@/src/content/guides";

export default function GuideNavigation() {
  const route = useRouter();
  const guideId = route.query["guide-id"] as string;

  const selectedStyle =
    "bg-[#0581DC19] border-l-[#0581DC] border-l-2 text-black dark:text-white px-4";

  return (
    <nav className="fixed left-10 hidden xl:top-[220px] xl:block xl:h-[calc(100%-270px)] xl:max-w-[15%] xl:overflow-x-visible xl:overflow-y-scroll 2xl:max-w-[20%]">
      <p className="mb-2 font-semibold">Guides</p>
      <ul>
        {Object.entries(guides).map((guide) => {
          const [id, guideData] = guide;
          const isSelected = id === guideId;

          return (
            <li
              key={id}
              className={`flex h-[36px] w-full items-center text-sm ${isSelected && selectedStyle}`}
            >
              <Link href={`/docs/guides/${id}`}>{guideData.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
