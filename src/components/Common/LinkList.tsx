import * as React from "react";

const LinkList = ({ elementList }: { elementList: string[] }) => {
  if (!elementList?.length) return null;

  return (
    <div className="basis-80 flex-grow-0 flex-shrink-0 w-full hidden 3xl:block 2xl:relative">
      <nav className="hidden 3xl:block xl:w-80 pl-4 pr-2 mt-10 fixed bottom-0 top-32 pb-10">
        <p className="letter uppercase mb-3 tracking-[1.5px]">On this page</p>
        <ul className="pl-[18px]">
          {elementList
            .filter((item) => !!item)
            .map((item) => (
              <li
                key={item}
                className="h-8 mt-2 flex items-center text-sm text-[#4E4E4E] dark:text-white"
              >
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default LinkList;
