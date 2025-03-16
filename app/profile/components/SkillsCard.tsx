import { BiCode } from "react-icons/bi";

export function SkillsCard() {
  return (
    <div className="col-span-1">
      <div className="bg-white rounded-xl border border-gray-100 h-full">
        <div className="p-5 border-b border-gray-50">
          <h3 className="font-medium text-gray-800 flex items-center">
            <BiCode className="mr-2 text-blue-500" />
            スキル
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              まだスキルが登録されていません
            </div>
            <div className="text-sm text-gray-500">
              学習を完了するとスキルが追加されます
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
