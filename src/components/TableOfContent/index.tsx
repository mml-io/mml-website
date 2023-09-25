import Link from "next/link";

export function Section({ title }: { title: string }) {
  return (
    <li className="my-2 text-2xl">
      <p>{title}</p>
    </li>
  );
}

export function SubSection({ title }: { title: string }) {
  return (
    <li className="ml-8 list-disc py-1 ">
      <Link href={`#${title.toLowerCase()}`}>
        <p className="text-xl">{title}</p>
      </Link>
    </li>
  );
}

export default function TableOfContent({ children }: { children: React.ReactNode }) {
  return <ul className="bg-primary p-6 text-white dark:bg-dark">{children}</ul>;
}
