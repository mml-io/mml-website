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
      <h2 className="text-3xl font-medium leading-[48px]">{title}</h2>
      <p className="mt-4 leading-[28px]">{description}</p>
      {children}
    </div>
  );
}
