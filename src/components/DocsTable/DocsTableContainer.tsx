import { AnchorLink } from "../Anchors/AnchorLink";

export function DocsTableContainer({
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
        <h2 className="text-3xl font-medium inline-block">{title}</h2>
      </AnchorLink>
      <p className="mt-4">{description}</p>
      <ul className="mt-4 list-none p-0">{children}</ul>
    </div>
  );
}
