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
      <section className="relative z-10 w-full overflow-hidden">
        <div>
          <div className="flex flex-wrap items-center">
            <div className="w-full">
              <div className="mb-4 max-w-[570px] lg:mb-6">
                <ul className="flex flex-wrap md:justify-start">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="pr-1 text-base font-medium text-body-color hover:text-primary"
                    >
                      Home
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                  </li>
                  {parents?.map((parent, index) => (
                    <li className="flex flex-wrap items-center" key={index}>
                      <Link
                        href={
                          "/" +
                          parents
                            .slice(0, index + 1)
                            .map((ancestor) => ancestor.path)
                            .join("/")
                        }
                        className="pr-1 text-base font-medium text-body-color hover:text-primary"
                      >
                        {parent.name}
                      </Link>
                      <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                    </li>
                  ))}
                  <li className="text-base font-medium text-primary">{pageName}</li>
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
