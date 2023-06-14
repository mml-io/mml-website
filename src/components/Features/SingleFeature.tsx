import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (

      <div className="wow fadeInUp" data-wow-delay=".15s">

          {icon}
        </div>


      </div>
    </div>
  );
};

export default SingleFeature;
