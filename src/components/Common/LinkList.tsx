import { useEffect, useState } from "react";
import * as React from "react";

const generateElementList = () => {
  const headings = Array.from(document.querySelectorAll("h2")); // Change the selector based on your needs

  return headings.map((heading) => {
    const id = heading.getAttribute("id");
    const text = heading.textContent;

    return (
      <li key={id} className="flex h-10 items-center text-sm text-[#4E4E4E] dark:text-white">
        <a href={`#${id}`}>{text}</a>
      </li>
    );
  });
};

const LinkList = () => {
  const [elementList, setElementList] = useState([]);

  useEffect(() => {
    setElementList(generateElementList());
  }, []);

  return (
    <nav className="hidden xl:block xl:flex-[0_0_150px]">
      <p className="letter mb-3 tracking-[1.5px]">In this section</p>
      <ul className="border-l-2 border-l-[#CDCDCD] pl-[18px]">{elementList}</ul>
    </nav>
  );
};

export default LinkList;
