
import { Brand } from "@/types/brand";

const brandsData: Brand[] = [
  {
    id: 1,
    name: "Improbable",
    href: "https://improbable.io/",
    image: "/images/brands/improbable.svg",
  },
];

const Brands = () => {
  return (

      <div className="container">


          <div className="w-full px-4">
            <div

              data-wow-delay=".1s
              "
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
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

      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"

      >

      </a>
    </div>
  );
};
