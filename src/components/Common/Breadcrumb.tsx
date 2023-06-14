import Link from "next/link";

const Breadcrumb = ({
  pageName,
  parents,
}: {
  pageName: string;
  parents?: Array<{ name: string; path: string }>;
}) => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">

                <ul className="flex md:justify-start">
                  <li className="flex items-center">
                    <Link
                      href="/"

                    >
                      Home
                    </Link>

                  </li>
                  {parents?.map((parent, index) => (
                    <li className="flex items-center" key={index}>
                      <Link
                        href={
                          "/" +
                          parents
                            .slice(0, index + 1)
                            .map((ancestor) => ancestor.path)
                            .join("/")
                        }

                      >
                        {parent.name}
                      </Link>

                    </li>
                  ))}

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
