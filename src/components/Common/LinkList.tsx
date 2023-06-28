import * as React from "react";

const LinkList = ({ elementList }: { elementList: string[] }) => {
  if (!elementList?.length) return null;

  return (
    <div className="hidden xl:block xl:flex-[0_0_150px]">
      <nav className="fixed">
        <p className="letter mb-3 tracking-[1.5px]">In this section</p>
        <ul className="border-l-2 border-l-[#CDCDCD] pl-[18px]">
          {elementList
            .filter((item) => !!item)
            .map((item) => (
              <div>
                <li
                  key={item}
                  className="flex h-10 items-center text-sm capitalize text-[#4E4E4E] dark:text-white"
                >
                  <a href={`#${item}`}>{item}</a>
                </li>
              </div>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default LinkList;
