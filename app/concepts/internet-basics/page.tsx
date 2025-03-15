import ConceptLayout from "@/app/components/concept-layout";
import { articleData } from "./data";
import InternetBasicsContent from "./content";

export default function InternetBasicsPage() {
  return (
    <ConceptLayout articleData={articleData}>
      <InternetBasicsContent />
    </ConceptLayout>
  );
}
