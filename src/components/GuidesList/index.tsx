import { DocsElement, DocsListContainer } from "@/src/components/DocsList";
import { orderedGuidesList } from "@/src/content/guides";

export default function GuidesList() {
  return (
    <DocsListContainer title="Guides" description="Guides to help you get started with MML">
      {orderedGuidesList.map(({ id, guide }) => (
        <DocsElement
          key={id}
          description={guide.description}
          name={`${guide.title}`}
          link={`/docs/guides/${id}`}
        />
      ))}
    </DocsListContainer>
  );
}
