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
  <div>
    <Link href={link}>
      <h5 className="mt-8 text-lg font-normal text-link-text dark:text-link-text-dark underline">
        {name}
      </h5>
    </Link>
    <p className={`text-editor-text mt-4`}>{description}</p>
  </div>
);
