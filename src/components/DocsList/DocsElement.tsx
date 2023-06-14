import Link from "next/link";

export const DocsElement = ({ description, name, link }) => (
  <div>
    <Link href={link}>
      <h5 className="mt-8 text-lg font-normal text-editor-title underline">{name}</h5>
    </Link>
    <p className={`text-editor-text ml-2 mt-4`}>{description}</p>
  </div>
);
