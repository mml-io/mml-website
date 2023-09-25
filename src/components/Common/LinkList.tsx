import * as React from "react";

const LinkList = ({ elementList }: { elementList: string[] }) => {
  if (!elementList?.length) return null;

  return (
    <nav className="right-2 top-[220px] hidden xl:fixed xl:block xl:w-44 2xl:w-60">
      <p className="letter mb-3 tracking-[1.5px]">On this page</p>
      <ul className="border-l-2 border-l-[#CDCDCD] pl-[18px]">
        {elementList
          .filter((item) => !!item)
          .map((item) => (
            <li
              key={item}
              className="min-h-10 mt-2 flex items-center text-sm text-[#4E4E4E] dark:text-white"
            >
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default LinkList;
