import ConceptLayout from "@/app/components/concept-layout";
import { articleData } from "./data";
import ComputerBasicsContent from "./content";

export default function ComputerBasicsPage() {
  return (
    <ConceptLayout articleData={articleData}>
      <ComputerBasicsContent />
    </ConceptLayout>
  );
}
