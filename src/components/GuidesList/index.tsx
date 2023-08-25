import { DocsElement, DocsListContainer } from "@/src/components/DocsList";
import { guides } from "@/src/content/guides";
export default function GuidesList() {
  return (
    <DocsListContainer
      title="Guides"
      description="Guides to help you get started with MML"
      className="mt-8 max-w-[800px]"
    >
      {Object.entries(guides).map(([key, { title, description }]) => (
        <DocsElement
          key={key}
          description={description}
          name={`${title}`}
          link={`/docs/guides/${key}`}
        />
      ))}
    </DocsListContainer>
  );
}
