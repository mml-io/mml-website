import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full border-[1px] border-editor-border bg-white p-8 dark:border-editor-border-dark dark:bg-editor-bg">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-6 flex h-[22px] w-[37px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className="mb-4 text-2xl font-normal text-black dark:text-white">{title}</h3>
        <p className="pr-[10px] text-base leading-tight text-black dark:text-white">{paragraph}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
