import { BiBookOpen } from "react-icons/bi";
import { TestResults } from "./TestResults";

export function LearningStatusSection() {
  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="bg-white rounded-xl border border-gray-100 h-full">
        <div className="p-5 border-b border-gray-50">
          <h3 className="font-medium text-gray-800 flex items-center">
            <BiBookOpen className="mr-2 text-blue-500" />
            学習状況
          </h3>
        </div>
        <div className="p-6">
          <TestResults />
        </div>
      </div>
    </div>
  );
}
