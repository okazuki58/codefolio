import { BiBookOpen, BiCode, BiUser } from "react-icons/bi";

export function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
      <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100">
          <div className="w-full h-full flex items-center justify-center">
            <BiUser className="text-3xl text-gray-300" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="h-6 bg-gray-200 rounded-md w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-48 mb-3"></div>
          <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
        </div>

        <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
      </div>
    </div>
  );
}

export function LearningStatusSkeleton() {
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
          {/* スタッツエリア */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="h-8 bg-gray-200 rounded-md w-12 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-200 rounded-md w-20 mx-auto"></div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="h-8 bg-gray-200 rounded-md w-12 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-200 rounded-md w-20 mx-auto"></div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="h-8 bg-gray-200 rounded-md w-12 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-200 rounded-md w-20 mx-auto"></div>
            </div>
          </div>

          {/* 最近のテスト結果エリア */}
          <div className="mt-6 pt-6 border-t border-gray-50">
            <div className="h-5 bg-gray-200 rounded-md w-40 mb-3"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-10 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded-md w-24 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-20"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-5 bg-gray-200 rounded-md w-12 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-8 ml-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
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
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountInfoSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-50">
        <h3 className="font-medium text-gray-800 flex items-center">
          <BiUser className="mr-2 text-blue-500" />
          アカウント情報
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">名前</div>
            <div className="h-5 bg-gray-200 rounded-md w-32"></div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">メールアドレス</div>
            <div className="h-5 bg-gray-200 rounded-md w-48"></div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">アカウント連携</div>
            <div className="h-5 bg-gray-200 rounded-md w-24"></div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">登録日</div>
            <div className="h-5 bg-gray-200 rounded-md w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
