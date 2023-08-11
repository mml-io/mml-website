import { useEffect, useState } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import unrealJSON from "./unreal.json";
import webJSON from "./web.json";

const PLATFORMS = ["web", "unreal"] as const;

function getItemsLists(element: string): {
  [key: string]: {
    web: {
      supported: string;
      description: string;
    };
    unreal: {
      supported: string;
      description: string;
    };
  };
}[] {
  const webList: { [key: string]: { supported: string; description: string } } = webJSON[element];
  const unrealList: { [key: string]: { supported: string; description: string } } =
    unrealJSON[element];

  // since we can assume they have the same elements, let's zip them together

  if (!webList || !unrealList) {
    throw new Error(`No items list found for ${element}`);
  }

  return Object.entries(webList).map(([name, webData]) => {
    return {
      [name]: {
        web: {
          supported: webData.supported,
          description: webData.description,
        },
        unreal: {
          supported: unrealList[name].supported,
          description: unrealList[name].description,
        },
      },
    };
  });
}

const ICON_COLORS = {
  true: "green",
  false: "red",
  undefined: "gray",
};

export default function CompatibilityTable({ element }: { element: string }) {
  const [itemsList, setItemsList] = useState(getItemsLists(element));
  const [openRowNumber, setOpenRowNumber] = useState(null);
  const [rowMessage, setRowMessage] = useState("");
  const [selected, setSelected] = useState<(number | null)[]>([null, null]);

  // this component should reinitialize if the page has changed
  useEffect(() => {
    setSelected([null, null]);
    setOpenRowNumber(null);
    setRowMessage("");
    setItemsList(getItemsLists(element));
  }, [element]);

  function handleCellClick(lineIndex: number, index: number, description) {
    if ((selected[0] === lineIndex && selected[1] === index) || !description) {
      return;
    }

    setOpenRowNumber(lineIndex);
    setRowMessage(description);
    setSelected([lineIndex, index]);
  }

  return (
    <table className="mt-10 w-full border-collapse border border-editor-border dark:border-editor-border-dark">
      <thead>
        <tr>
          <th className="border-editor-border p-2 dark:border-editor-border-dark" />
          {PLATFORMS.map((platform) => {
            return (
              <th
                key={platform}
                className="w-[40%] border-editor-border p-2 text-center dark:border-editor-border-dark"
              >
                {platform.toUpperCase()}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {itemsList.map((item, lineIndex) => {
          const name = Object.keys(item)[0];
          return (
            <>
              <tr key={name} className="border border-editor-border dark:border-editor-border-dark">
                <td className="border border-editor-border p-3 dark:border-editor-border-dark">
                  <code className="bg-[#F2F1F1] p-0.5 font-mono !text-[#0069C2] dark:bg-[#262626]">
                    {name}
                  </code>
                </td>
                {PLATFORMS.map((platform, index) => {
                  const { supported, description } = item[name][platform];
                  const isSelected = selected[0] === lineIndex && selected[1] === index;

                  return (
                    <td
                      className={twMerge(
                        "box-border border border-editor-border p-2 text-center dark:border-editor-border-dark",
                        description && "cursor-pointer hover:border-b-4 hover:border-b-white",
                        isSelected && "border-b-[3px] text-white",
                        `text-${ICON_COLORS[supported]}`,
                      )}
                      style={{
                        color: supported === undefined ? "gray" : supported ? "green" : "red",
                      }}
                      key={`${index}-${platform}-${name}`}
                      onClick={() => handleCellClick(lineIndex, index, description)}
                    >
                      {supported === undefined ? "?" : supported ? "✓" : "✗"}
                      {description && "*"}
                    </td>
                  );
                })}
              </tr>
              {openRowNumber === lineIndex && (
                <tr className="border border-editor-border dark:border-editor-border-dark">
                  <td className="border border-none p-2" />
                  <td
                    colSpan={PLATFORMS.length + 1}
                    className="border-none p-2 dark:border-editor-border-dark"
                  >
                    {rowMessage}
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
