import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ChangeEvent, FocusEvent, useState } from "react";
import { twMerge } from "tailwind-merge";

import { posts } from "@/src/content/blogPosts";
import { examples } from "@/src/content/docs";
import { guides } from "@/src/content/guides";
import { BlogPost } from "@/types/blog-post";
import { DocsGuide } from "@/types/docs-guides";

type Item = {
  name: string;
  link: string;
};

const blogPostsList = Object.entries(posts);
const guidesList = Object.entries(guides);
const mElements = Object.keys(examples).filter((element) => element.startsWith("m-"));
const mEvents = Object.keys(examples).filter((element) => !element.startsWith("m-"));

function createReferenceWithLink(element: string, type: "elements" | "events"): Item {
  return {
    name: element,
    link: `/docs/reference/${type}/${element}`,
  };
}

function createPostWithLink(id: string, post: BlogPost | DocsGuide, url: string): Item {
  return {
    name: post.title,
    link: `/${url}/${id}`,
  };
}

const allItems: Item[] = [
  ...mElements.map((element) => createReferenceWithLink(element, "elements")),
  ...mEvents.map((element) => createReferenceWithLink(element, "events")),
  ...blogPostsList.map(([id, post]) => createPostWithLink(id, post as BlogPost, "blog")),
  ...guidesList.map(([id, guide]) => createPostWithLink(id, guide as DocsGuide, "docs/guides")),
];

const MAX_RESULTS = 10;

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Item[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const emptySearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  const handleFocusOut = (event: FocusEvent<HTMLLabelElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;

    setSearchTerm("");
    setResults([]);
  };

  return (
    <label className="hidden lg:block mx-10 flex-1 relative" onBlur={handleFocusOut}>
      <span className="absolute top-2 left-4">
        <FontAwesomeIcon icon={faSearch} opacity="30%" />
      </span>
      <input
        className="w-full rounded-3xl h-10 outline-none pl-10 pr-4 bg-lightgrey dark:bg-grey text-black dark:text-white"
        placeholder="Search"
        type="search"
        onChange={handleChange}
        value={searchTerm}
      />
      <ul className="w-[calc(100%-30px)] absolute top-[calc(100%+2px)] flex flex-col bg-lightgrey dark:bg-grey left-1/2 -translate-x-1/2">
        {results.slice(0, MAX_RESULTS).map((item, index) => (
          <Link href={item.link} key={index} onClick={emptySearch}>
            <li className="bloc h-14 px-4">
              <span
                className={twMerge(
                  "w-full border-b-[1px] h-full flex items-center",
                  (index === MAX_RESULTS - 1 || results.length - 1 === index) && "border-none",
                )}
              >
                {item.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </label>
  );
}
