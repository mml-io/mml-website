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
      className={`flex items-center gap-3 px-2 py-2 rounded text-sm transition-colors ${
        isSelected ? "bg-mml-500/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
      }`}
      href={`/examples/?example=${exampleId}`}
    >
      <img className="w-12 h-12 rounded object-cover shrink-0" src={image} alt={name} />
      <div className="min-w-0">
        <div className={`font-medium truncate ${isSelected ? "text-mml-600 dark:text-white" : ""}`}>
          {name}
        </div>
        <div className="opacity-50 text-xs mt-0.5 truncate">{description}</div>
      </div>
    </Link>
  );
}
