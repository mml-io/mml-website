export function DocsTableContainer({
  children,
  title,
  type,
  description,
  className,
}: {
  children: React.ReactNode;
  title: string;
  type: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="mt-4">{description}</p>
      <section className={`mt-6 w-full table-fixed border-collapse`}>
        <ul>{children}</ul>
      </section>
    </div>
  );
}
