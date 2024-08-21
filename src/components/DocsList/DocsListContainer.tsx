import { AnchorLink } from "../Anchors/AnchorLink";

export function DocsListContainer({
  children,
  title,
  description,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <AnchorLink anchorId={title.toLowerCase()} title={title} verticalOffset>
        <h2 className="text-3xl font-medium leading-[48px] inline-block">{title}</h2>
      </AnchorLink>
      <p className="mt-4 leading-[28px]">{description}</p>
      {children}
    </div>
  );
}
