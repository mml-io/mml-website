import Link from "next/link";

export const DocsElement = ({
  description,
  name,
  link,
}: {
  description: string;
  name: string;
  link: string;
}) => (
  <div className="py-3 border-b border-black/5 dark:border-white/5 last:border-0">
    <Link href={link}>
      <h5 className="text-base font-medium text-link-text dark:text-link-text-dark">{name}</h5>
    </Link>
    <p className="text-sm opacity-70 mt-1">{description}</p>
  </div>
);
