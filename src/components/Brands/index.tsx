import { useTheme } from "next-themes";

import { Brand } from "@/types/brand";

const brandsData: Brand[] = [
  {
    id: 1,
    name: "MSquared",
    href: "https://www.msquared.io/",
    image: "/images/brands/msquared.svg",
  },
];

const Brands = () => {
  const { theme } = useTheme();

  return (
    <section className="pb-32">
      <div className="container">
        <h2 className="text-center text-xl font-medium">Founded by</h2>
        <div className="-mx-4 flex flex-wrap content-start">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-wrap items-center justify-center rounded-md bg-transparent"
              data-wow-delay=".1s
              "
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
        <h2 className="text-center text-xl font-medium">Website hosted by</h2>
        <div className="-mx-4 flex flex-wrap content-start">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-wrap items-center justify-center rounded-md bg-transparent"
              data-wow-delay=".1s
              "
            >
              <div className="mx-3 flex h-24 w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
                <a href="https://www.netlify.com">
                  <img
                    src={
                      theme === "dark"
                        ? "https://www.netlify.com/v3/img/components/netlify-color-accent.svg"
                        : "https://www.netlify.com/v3/img/components/netlify-color-bg.svg"
                    }
                    alt="Deploys by Netlify"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="mx-3 flex h-24 w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-full bg-transparent grayscale transition hover:opacity-70 hover:grayscale-0 dark:hover:opacity-70"
      >
        <img src={image} alt={name} className="brightness-0 filter dark:invert" />
      </a>
    </div>
  );
};
