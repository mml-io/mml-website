import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionTitle from "../Common/SectionTitle";

const Features = () => {
  return (
    <>

        <div className="container">

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
