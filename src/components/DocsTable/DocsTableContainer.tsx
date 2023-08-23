export const tableBorder = "border-[1px] border-editor-border dark:border-editor-border-dark";

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
      <table className={`mt-6 ${tableBorder} w-full table-fixed border-collapse`}>
        <thead className={`h-10 ${tableBorder}`}>
          <tr>
            <th className={`${tableBorder} w-[40%] pl-6 text-left text-xs`}>{type}</th>
            <th className={`${tableBorder} pl-6 text-left text-xs`}>Description</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
