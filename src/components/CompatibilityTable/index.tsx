import { Fragment, useEffect, useState } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import unrealJSON from "./unreal.json";
import webJSON from "./web.json";

type CompatibilityTableJSON = {
  [key: string]: {
    [key: string]: {
      supported: boolean;
      description: string;
    };
  };
};

const PLATFORMS = ["web", "unreal"] as const;

function getItemsLists(element: string): {
  [key: string]: {
    web: {
      supported: boolean;
      description: string;
    };
    unreal: {
      supported: boolean;
      description: string;
    };
  };
}[] {
  const webList: { [key: string]: { supported: boolean; description: string } } = (
    webJSON as CompatibilityTableJSON
  )[element];
  const unrealList: { [key: string]: { supported: boolean; description: string } } = (
    unrealJSON as CompatibilityTableJSON
  )[element];

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
  const [openRowNumber, setOpenRowNumber] = useState<number | null>(null);
  const [rowMessage, setRowMessage] = useState("");
  const [selected, setSelected] = useState<(number | null)[]>([null, null]);

  // this component should reinitialize if the page has changed
  useEffect(() => {
    setSelected([null, null]);
    setOpenRowNumber(null);
    setRowMessage("");
    setItemsList(getItemsLists(element));
  }, [element]);

  function handleCellClick(lineIndex: number, index: number, description: string) {
    if ((selected[0] === lineIndex && selected[1] === index) || !description) {
      return;
    }

    setOpenRowNumber(lineIndex);
    setRowMessage(description);
    setSelected([lineIndex, index]);
  }

  return (
    <table className="mt-10 box-border w-full border-collapse border border-editor-border dark:border-editor-border-dark">
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
            <Fragment key={name}>
              <tr className="border border-editor-border dark:border-editor-border-dark">
                <td className="border border-editor-border p-3 dark:border-editor-border-dark">
                  <code className="bg-code-bg p-0.5 font-mono !text-code-text dark:bg-code-bg-dark">
                    {name}
                  </code>
                </td>
                {PLATFORMS.map((platform, index) => {
                  const { supported, description } = item[name][platform];
                  const isSelected = selected[0] === lineIndex && selected[1] === index;

                  let iconColor;
                  if (supported === undefined) {
                    iconColor = ICON_COLORS.undefined;
                  } else if (supported === true) {
                    iconColor = ICON_COLORS.true;
                  } else {
                    iconColor = ICON_COLORS.false;
                  }

                  return (
                    <td
                      className={twMerge(
                        "box-border border border-editor-border p-2 text-center dark:border-editor-border-dark",
                        description &&
                          "hover:border-b-gray cursor-pointer hover:border-b-4 dark:hover:border-b-white",
                        isSelected && "border-b-[3px] text-white",
                        `text-${iconColor}`,
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
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
