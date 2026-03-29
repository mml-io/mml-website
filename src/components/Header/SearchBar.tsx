import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ChangeEvent, FocusEvent, useState } from "react";

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

export function SearchBar({ className = "hidden lg:block mx-6 flex-1" }: { className?: string }) {
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
    <label className={`${className} relative`} onBlur={handleFocusOut}>
      <span className="absolute top-2.5 left-3.5 text-secondary dark:text-slate-500">
        <FontAwesomeIcon icon={faSearch} className="w-3.5 h-3.5" />
      </span>
      <input
        className="w-full rounded-lg h-10 outline-none pl-9 pr-4 text-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-dark dark:text-white placeholder:text-secondary dark:placeholder:text-slate-500 focus:border-mml-500/50 focus:ring-1 focus:ring-mml-500/30 transition-all"
        placeholder="Search"
        type="search"
        onChange={handleChange}
        value={searchTerm}
      />
      {results.length > 0 && (
        <ul className="w-full absolute top-[calc(100%+4px)] flex flex-col bg-white dark:bg-slate-900 border border-black/10 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden left-0">
          {results.slice(0, MAX_RESULTS).map((item, index) => (
            <li key={index} className="mx-1 my-0.5">
              <Link href={item.link} onClick={emptySearch} className="h-11 px-3 rounded-lg flex items-center text-sm text-secondary dark:text-slate-300 hover:bg-lightgrey dark:hover:bg-slate-800 hover:text-dark dark:hover:text-white transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}
