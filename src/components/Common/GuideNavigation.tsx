import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { guides } from "@/src/content/guides";

export default function GuideNavigation() {
  const route = useRouter();
  const guideId = route.query["guide-id"] as string;

  const selectedStyle =
    "bg-body-color bg-opacity-30 text-black dark:text-white pl-4 rounded-br rounded-tr";

  return (
    <div className="basis-80 flex-grow-0 flex-shrink-0 w-full hidden 2xl:block 2xl:relative">
      <nav className="lg:overflow-y-scroll w-80 fixed bottom-0 top-32 pb-10">
        <p className="font-semibold pl-5 mb-2">MML Elements</p>
        <ul>
          {Object.entries(guides).map((guide) => {
            const [id, guideData] = guide;
            const isSelected = id === guideId;

            return (
              <li
                key={id}
                className={`flex h-11 w-full items-center text-sm pl-7 ${
                  isSelected && selectedStyle
                }`}
              >
                <Link href={`/docs/guides/${id}`}>{guideData.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
