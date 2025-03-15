import {
  BiChip,
  BiMemoryCard,
  BiCodeAlt,
  BiServer,
  BiDesktop,
  BiMobile,
  BiWindows,
  BiHdd,
} from "react-icons/bi";
import Feedback from "@/app/components/feedback";
import Image from "next/image";

export default function ComputerBasicsContent() {
  return (
    <section>
      {/* セクション1: コンピューターとは？ */}
      <div id="section-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
          1. コンピューターとは？
        </h2>

        <p className="text-gray-800 mb-6">
          コンピューターとは、プログラムに従ってデータを処理する電子機器です。現代社会では、パソコンやスマートフォンだけでなく、家電製品や自動車など、様々な場所にコンピューターが組み込まれています。
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <BiDesktop className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800">
                パーソナルコンピューター
              </h3>
            </div>
            <p className="text-gray-700">
              個人が利用する汎用コンピューター。事務作業、インターネット閲覧、ゲーム、プログラミングなど幅広い用途に使用。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <BiMobile className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800">モバイルデバイス</h3>
            </div>
            <p className="text-gray-700">
              スマートフォンやタブレットなど。小型ながら高性能で、通信機能を活用したサービスを利用できる。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <BiServer className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800">サーバー</h3>
            </div>
            <p className="text-gray-700">
              ネットワークを通じてサービスを提供するための高性能コンピューター。ウェブサイト、メール、データベースなどを管理。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <BiChip className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800">組込みシステム</h3>
            </div>
            <p className="text-gray-700">
              特定の機能を実行するために機器に組み込まれたコンピューター。家電製品、自動車、医療機器など。
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3">
          コンピューターの基本構成要素
        </h3>

        <p className="text-gray-800 mb-4">
          あらゆるコンピューターは、基本的に以下の要素から構成されています：
        </p>

        <div className="relative bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
            <div className="flex">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 mb-1">入力装置</h4>
                <p className="text-gray-700 text-sm">
                  キーボード、マウス、タッチスクリーン、マイクなど、外部からデータを取り込む装置
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 mb-1">出力装置</h4>
                <p className="text-gray-700 text-sm">
                  ディスプレイ、スピーカー、プリンターなど、処理結果を外部に伝える装置
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 mb-1">
                  中央処理装置 (CPU)
                </h4>
                <p className="text-gray-700 text-sm">
                  コンピューターの頭脳。命令を解釈し、計算や制御を行う
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                4
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 mb-1">メモリ (RAM)</h4>
                <p className="text-gray-700 text-sm">
                  一時的にデータや命令を格納する場所。電源を切ると内容が消える
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                5
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 mb-1">ストレージ</h4>
                <p className="text-gray-700 text-sm">
                  ハードディスクやSSDなど、データを長期的に保存する装置
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                6
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800 mb-1">バス</h4>
                <p className="text-gray-700 text-sm">
                  各装置間でデータをやり取りするための経路
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">
            コンピューターの動作原理
          </h3>
          <p className="text-gray-800 mb-4">
            基本的に、コンピューターは「命令を取り込み、実行する」というサイクルを繰り返して動作します。この仕組みは「フォン・ノイマン型」と呼ばれ、現代のほとんどのコンピューターで採用されています。
          </p>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">
              命令実行サイクル（フェッチ・デコード・実行サイクル）
            </h4>
            <ol className="text-gray-700 space-y-2">
              <li>
                <strong>フェッチ：</strong> メモリから命令を取り出します
              </li>
              <li>
                <strong>デコード：</strong> 命令の内容を解読します
              </li>
              <li>
                <strong>実行：</strong>{" "}
                命令を実行します（計算や、メモリからのデータ読み取り/書き込みなど）
              </li>
              <li>
                <strong>ストア：</strong> 結果をメモリに書き込みます
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* セクション2: CPUの役割と仕組み */}
      <div id="section-2" className="mt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
          2. CPUの役割と仕組み
        </h2>

        <p className="text-gray-800 mb-6">
          CPU（Central Processing
          Unit：中央処理装置）は、コンピューターの頭脳とも呼ばれる部品で、コンピューターの動作に必要なあらゆる計算や制御を行います。
        </p>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="font-bold text-gray-800 mb-4">CPUの主要な構成要素</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                <h4 className="font-bold text-gray-800 mb-2">制御装置</h4>
                <p className="text-gray-700 text-sm">
                  命令を解読し、コンピューター全体の動作を制御します。プログラムの指示に従って、演算装置やメモリに対する操作の指示を出します。
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-2">
                  演算装置（ALU）
                </h4>
                <p className="text-gray-700 text-sm">
                  Arithmetic Logic
                  Unit（算術論理演算装置）。数値計算や論理演算（AND, OR,
                  NOTなど）を行います。四則演算から複雑な計算まで、あらゆる計算処理を担当します。
                </p>
              </div>
            </div>

            <div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                <h4 className="font-bold text-gray-800 mb-2">レジスタ</h4>
                <p className="text-gray-700 text-sm">
                  CPUの内部にある小容量で高速なメモリです。演算に必要なデータや命令、計算結果などを一時的に保持します。CPUが直接アクセスできる最も高速なメモリです。
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-2">
                  キャッシュメモリ
                </h4>
                <p className="text-gray-700 text-sm">
                  CPU内部またはCPUに近接した高速メモリで、頻繁に使用するデータやプログラムを一時的に保存します。メインメモリ（RAM）へのアクセス回数を減らし、処理を高速化します。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">クロック</h4>
            <p className="text-gray-700 mb-3">
              CPUの動作速度を決める基準となる信号です。クロック周波数（Hz単位で表される）が高いほど、同じ時間内により多くの命令を処理できます。
            </p>
            <div className="flex items-center">
              <div className="flex-1 h-8 bg-green-100 rounded flex items-center justify-center">
                <span className="text-sm">2.4GHz</span>
              </div>
              <div className="mx-3 text-gray-500">vs</div>
              <div className="flex-1 h-8 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-sm">3.6GHz</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              3.6GHzのCPUは、2.4GHzのCPUより理論上約1.5倍速い
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">CPUの性能指標</h3>

        <div className="space-y-4 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">クロック周波数</h4>
            <p className="text-gray-700">
              1秒間に実行できる基本的なサイクル数を表します。単位はHz（ヘルツ）で、現代のCPUでは数GHz（ギガヘルツ）が一般的です。高いほど理論上は処理が速くなります。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">コア数</h4>
            <p className="text-gray-700">
              1つのCPUチップ内に含まれる処理ユニット（コア）の数です。マルチコアCPUは複数の処理を並列して実行できるため、複数のアプリケーションを同時に実行する場合に有利です。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">キャッシュサイズ</h4>
            <p className="text-gray-700">
              CPU内のキャッシュメモリの容量です。大きいほど多くのデータを高速にアクセスできるため、処理の効率が上がります。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">命令セット</h4>
            <p className="text-gray-700">
              CPUが理解できる基本命令の集合です。x86, ARM,
              RISC-Vなど様々な命令セットがあり、それぞれ特徴があります。
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-8">
          <h3 className="font-bold text-blue-800 mb-3">
            身近な例え：CPUは会社の社長
          </h3>
          <p className="text-gray-800">
            CPUを会社の社長に例えると理解しやすいでしょう。社長は会社全体の指示を出し（制御装置）、重要な判断を行い（演算装置）、必要な情報をメモして参照します（レジスタ）。また、秘書（キャッシュメモリ）が重要な情報をすぐに取り出せるように準備しています。会社の規模（クロック周波数）や部署の数（コア数）が多いほど、同時により多くの仕事を処理できます。
          </p>
        </div>
      </div>

      {/* セクション3: メモリとストレージの違い */}
      <div id="section-3" className="mt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
          3. メモリとストレージの違い
        </h2>

        <p className="text-gray-800 mb-6">
          コンピューターでは、データを保存する場所として「メモリ」と「ストレージ」という2種類の装置があります。それぞれ役割や特性が大きく異なります。
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <BiMemoryCard className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800">メモリ（RAM）</h3>
            </div>

            <h4 className="font-bold text-gray-700 text-sm mb-2">特徴</h4>
            <ul className="text-gray-700 text-sm space-y-2 mb-4">
              <li>
                • <strong>揮発性</strong>：電源が切れると内容が消える
              </li>
              <li>
                • <strong>高速</strong>：アクセス速度が非常に速い
              </li>
              <li>
                • <strong>一時的</strong>：実行中のプログラムやデータを保持
              </li>
              <li>
                • <strong>容量</strong>：比較的小さい（数GB～数十GB）
              </li>
              <li>
                • <strong>価格</strong>：容量あたりの価格が高い
              </li>
            </ul>

            <h4 className="font-bold text-gray-700 text-sm mb-2">役割</h4>
            <p className="text-gray-700 text-sm">
              現在実行中のプログラムやデータを一時的に保持します。処理中のデータを高速にCPUに提供するための「作業場」のような役割を果たします。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <BiHdd className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800">ストレージ</h3>
            </div>

            <h4 className="font-bold text-gray-700 text-sm mb-2">特徴</h4>
            <ul className="text-gray-700 text-sm space-y-2 mb-4">
              <li>
                • <strong>不揮発性</strong>：電源が切れても内容が保持される
              </li>
              <li>
                • <strong>低速</strong>：メモリに比べてアクセス速度が遅い
              </li>
              <li>
                • <strong>永続的</strong>：長期的なデータ保存に使用
              </li>
              <li>
                • <strong>容量</strong>：大容量（数百GB～数TB）
              </li>
              <li>
                • <strong>価格</strong>：容量あたりの価格が安い
              </li>
            </ul>

            <h4 className="font-bold text-gray-700 text-sm mb-2">役割</h4>
            <p className="text-gray-700 text-sm">
              OSやアプリケーション、ユーザーデータなどを長期的に保存します。「書庫」や「ファイルキャビネット」のような役割を果たします。
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm mb-8">
          <h3 className="font-bold text-gray-800 mb-4">
            身近な例え：作業机と本棚
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">メモリ = 作業机</h4>
              <p className="text-gray-700 text-sm">
                今取り組んでいる作業に必要な書類や道具を広げておく場所。必要なものにすぐアクセスできるが、スペースは限られている。机を片付ける（電源を切る）と、配置していたものはなくなる。
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">
                ストレージ = 本棚/書庫
              </h4>
              <p className="text-gray-700 text-sm">
                すべての書類、本、資料などを保管しておく場所。大量のものを保存できるが、必要なものを取り出すのに時間がかかる。棚に戻しておけば、次の日も同じ場所から取り出せる（電源を切っても情報は保持される）。
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          代表的なストレージの種類と特徴
        </h3>

        <div className="bg-white rounded-lg shadow-sm mb-8">
          {/* モバイル表示用のカードビュー */}
          <div className="md:hidden space-y-4 p-4">
            {/* HDD */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium text-gray-800 mb-2">
                HDD（ハードディスク）
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">特徴:</div>
                <div>回転する磁気ディスクにデータを記録</div>
                <div className="text-gray-500">速度:</div>
                <div>遅い（〜200MB/s）</div>
                <div className="text-gray-500">価格/容量:</div>
                <div>安価・大容量</div>
                <div className="text-gray-500">主な用途:</div>
                <div>大量データの保存、アーカイブ</div>
              </div>
            </div>

            {/* SSD */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium text-gray-800 mb-2">
                SSD（ソリッドステート）
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">特徴:</div>
                <div>フラッシュメモリを使用した半導体ストレージ</div>
                <div className="text-gray-500">速度:</div>
                <div>速い（〜3500MB/s以上）</div>
                <div className="text-gray-500">価格/容量:</div>
                <div>やや高価</div>
                <div className="text-gray-500">主な用途:</div>
                <div>OSやアプリ、頻繁に使うデータ</div>
              </div>
            </div>

            {/* USBメモリ */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium text-gray-800 mb-2">USBメモリ</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">特徴:</div>
                <div>小型で持ち運びやすいフラッシュメモリ</div>
                <div className="text-gray-500">速度:</div>
                <div>中程度</div>
                <div className="text-gray-500">価格/容量:</div>
                <div>中程度</div>
                <div className="text-gray-500">主な用途:</div>
                <div>データの持ち運び、バックアップ</div>
              </div>
            </div>

            {/* クラウドストレージ */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium text-gray-800 mb-2">
                クラウドストレージ
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">特徴:</div>
                <div>インターネット上のサーバーにデータを保存</div>
                <div className="text-gray-500">速度:</div>
                <div>ネット接続に依存</div>
                <div className="text-gray-500">価格/容量:</div>
                <div>月額制・大容量</div>
                <div className="text-gray-500">主な用途:</div>
                <div>複数デバイス間での共有、バックアップ</div>
              </div>
            </div>
          </div>

          {/* デスクトップ表示用のテーブル */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-bold">
                    種類
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700">特徴</th>
                  <th className="py-3 px-4 text-left text-gray-700">速度</th>
                  <th className="py-3 px-4 text-left text-gray-700">
                    価格/容量
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700">
                    主な用途
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="py-3 px-4 font-medium">
                    HDD（ハードディスク）
                  </td>
                  <td className="py-3 px-4">
                    回転する磁気ディスクにデータを記録
                  </td>
                  <td className="py-3 px-4">遅い（〜200MB/s）</td>
                  <td className="py-3 px-4">安価・大容量</td>
                  <td className="py-3 px-4">大量データの保存、アーカイブ</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-3 px-4 font-medium">
                    SSD（ソリッドステート）
                  </td>
                  <td className="py-3 px-4">
                    フラッシュメモリを使用した半導体ストレージ
                  </td>
                  <td className="py-3 px-4">速い（〜3500MB/s以上）</td>
                  <td className="py-3 px-4">やや高価</td>
                  <td className="py-3 px-4">OSやアプリ、頻繁に使うデータ</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-3 px-4 font-medium">USBメモリ</td>
                  <td className="py-3 px-4">
                    小型で持ち運びやすいフラッシュメモリ
                  </td>
                  <td className="py-3 px-4">中程度</td>
                  <td className="py-3 px-4">中程度</td>
                  <td className="py-3 px-4">データの持ち運び、バックアップ</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-3 px-4 font-medium">クラウドストレージ</td>
                  <td className="py-3 px-4">
                    インターネット上のサーバーにデータを保存
                  </td>
                  <td className="py-3 px-4">ネット接続に依存</td>
                  <td className="py-3 px-4">月額制・大容量</td>
                  <td className="py-3 px-4">
                    複数デバイス間での共有、バックアップ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-8">
          <h3 className="font-bold text-blue-800 mb-3">メモリ階層</h3>
          <p className="text-gray-800 mb-4">
            コンピューターでは、速度と容量のトレードオフを考慮し、複数の種類のメモリが階層構造になっています。
          </p>

          <div className="bg-white p-4 rounded-lg">
            <div className="relative py-3">
              <div className="w-full h-10 bg-red-100 rounded flex items-center justify-center mb-2">
                <span className="text-sm font-medium">
                  レジスタ（最速・最小容量）
                </span>
              </div>
              <div className="w-full h-14 bg-orange-100 rounded flex items-center justify-center mb-2">
                <span className="text-sm font-medium">
                  キャッシュメモリ（L1/L2/L3）
                </span>
              </div>
              <div className="w-full h-20 bg-yellow-100 rounded flex items-center justify-center mb-2">
                <span className="font-medium">メインメモリ（RAM）</span>
              </div>
              <div className="w-full h-28 bg-green-100 rounded flex items-center justify-center mb-2">
                <span className="font-medium">SSD（高速ストレージ）</span>
              </div>
              <div className="w-full h-36 bg-blue-100 rounded flex items-center justify-center">
                <span className="font-medium">HDD（大容量ストレージ）</span>
              </div>

              <div className="absolute top-0 bottom-0 right-0 w-1 flex flex-col justify-between py-3">
                <span className="text-xs text-gray-600">高速</span>
                <span className="text-xs text-gray-600">低速</span>
              </div>

              <div className="absolute top-0 bottom-0 left-0 w-1 flex flex-col justify-between py-3">
                <span className="text-xs text-gray-600">小容量</span>
                <span className="text-xs text-gray-600">大容量</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* セクション4: OS（オペレーティングシステム）の役割 */}
      <div id="section-4" className="mt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
          4. OS（オペレーティングシステム）の役割
        </h2>

        <p className="text-gray-800 mb-6">
          OS（オペレーティングシステム）は、コンピューターのハードウェアを管理し、アプリケーションソフトウェアを実行するための基盤となるソフトウェアです。ユーザーとハードウェアの間に立ち、様々な制御や管理を行います。
        </p>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="font-bold text-gray-800 mb-4">主要なOS</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Windows</h4>
              <p className="text-gray-700 text-sm mb-2">
                Microsoft社が開発。世界で最も普及しているデスクトップOS。様々な周辺機器との互換性が高く、ビジネスソフトが充実。
              </p>
              <div className="bg-gray-100 text-gray-600 text-xs p-1 rounded">
                例：Windows 10, Windows 11
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">macOS</h4>
              <p className="text-gray-700 text-sm mb-2">
                Apple社が開発。Macintoshコンピューター専用のOS。安定性が高く、デザインやクリエイティブ作業向け。
              </p>
              <div className="bg-gray-100 text-gray-600 text-xs p-1 rounded">
                例：macOS Ventura, macOS Sonoma
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Linux</h4>
              <p className="text-gray-700 text-sm mb-2">
                オープンソースのOS。様々なディストリビューション（配布版）が存在。サーバー用途や開発環境として人気。
              </p>
              <div className="bg-gray-100 text-gray-600 text-xs p-1 rounded">
                例：Ubuntu, CentOS, Debian
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Android</h4>
              <p className="text-gray-700 text-sm mb-2">
                Google主導で開発されたモバイルOS。Linuxカーネルベース。スマートフォンやタブレットに広く採用されている。
              </p>
              <div className="bg-gray-100 text-gray-600 text-xs p-1 rounded">
                例：Android 13, Android 14
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">iOS/iPadOS</h4>
              <p className="text-gray-700 text-sm mb-2">
                Apple社がiPhone/iPad向けに開発したモバイルOS。セキュリティやプライバシー保護に力を入れている。
              </p>
              <div className="bg-gray-100 text-gray-600 text-xs p-1 rounded">
                例：iOS 16, iPadOS 16
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          OSの主な機能と役割
        </h3>

        <div className="space-y-4 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">
              1. ハードウェア管理
            </h4>
            <p className="text-gray-700">
              CPUの割り当て、メモリ管理、入出力装置の制御など、コンピューターの各ハードウェアを管理します。アプリケーションは直接ハードウェアを操作せず、OSを通じてアクセスします。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">
              2. ファイルシステム
            </h4>
            <p className="text-gray-700">
              データをファイルとして管理し、ストレージデバイス上の保存方法を制御します。ファイルの作成、読み書き、削除などの基本操作を提供します。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">3. プロセス管理</h4>
            <p className="text-gray-700">
              アプリケーション（プロセス）の実行を管理します。複数のプロセスを同時に実行させるマルチタスキングや、CPUリソースの割り当てなどを制御します。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">4. メモリ管理</h4>
            <p className="text-gray-700">
              メモリのどの部分が使用中か、どのプログラムが使用しているかを管理します。仮想メモリを使って物理メモリより大きなメモリ空間を提供したり、不要になったメモリを解放したりします。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">
              5. ユーザーインターフェース
            </h4>
            <p className="text-gray-700">
              グラフィカルユーザーインターフェース（GUI）やコマンドラインインターフェース（CLI）を通じて、ユーザーがコンピューターを操作できるようにします。
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2">
              6. セキュリティ管理
            </h4>
            <p className="text-gray-700">
              ユーザー認証、アクセス権限の管理、データの暗号化など、システムやデータを保護するためのセキュリティ機能を提供します。
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-gray-800 mb-4">OSのアーキテクチャ</h3>

          <div className="flex flex-col relative">
            {/* アプリケーション層 */}
            <div className="w-full bg-white p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-50 p-3 rounded text-center">
                  <span className="text-sm font-medium">ブラウザ</span>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <span className="text-sm font-medium">オフィスソフト</span>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <span className="text-sm font-medium">ゲーム</span>
                </div>
              </div>
              <div className="text-center text-sm mt-2">アプリケーション</div>
            </div>

            {/* 第1の接続線 */}
            <div className="flex justify-center py-1">
              <div className="border-l-2 border-dashed border-gray-400 h-4"></div>
            </div>

            {/* オペレーティングシステム層 */}
            <div className="w-full bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-yellow-100 p-2 rounded text-center">
                  <span className="text-xs">GUI</span>
                </div>
                <div className="bg-yellow-100 p-2 rounded text-center">
                  <span className="text-xs">API</span>
                </div>
                <div className="bg-yellow-100 p-2 rounded text-center">
                  <span className="text-xs">サービス</span>
                </div>
                <div className="bg-yellow-100 p-2 rounded text-center">
                  <span className="text-xs">ドライバ</span>
                </div>
              </div>
              <div className="text-center text-sm mt-2">
                オペレーティングシステム
              </div>
            </div>

            {/* 第2の接続線 */}
            <div className="flex justify-center py-1">
              <div className="border-l-2 border-dashed border-gray-400 h-4"></div>
            </div>

            {/* ハードウェア層 */}
            <div className="w-full bg-red-50 p-4 border border-red-200 rounded-lg">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-red-100 p-2 rounded text-center">
                  <span className="text-xs">CPU</span>
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  <span className="text-xs">メモリ</span>
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  <span className="text-xs">ディスク</span>
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  <span className="text-xs">周辺機器</span>
                </div>
              </div>
              <div className="text-center text-sm mt-2">ハードウェア</div>
            </div>
          </div>
        </div>
      </div>

      {/* セクション5: プログラムが動く仕組み */}
      <div id="section-5" className="mt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
          5. プログラムが動く仕組み（ソースコードから機械語まで）
        </h2>

        <p className="text-gray-800 mb-6">
          プログラムは人間が理解できる形式（ソースコード）で書かれますが、コンピューターが実行するには機械語に変換する必要があります。ここでは、ソースコードが実際に実行される仕組みを見ていきましょう。
        </p>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="font-bold text-gray-800 mb-4">
            プログラミング言語の種類
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">高水準言語</h4>
              <p className="text-gray-700 text-sm mb-3">
                人間が理解しやすい形式で、抽象的な記述が可能な言語。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-xs font-medium block mb-1">例：</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    Python
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    JavaScript
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    Java
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    C#
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    Ruby
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    Go
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">低水準言語</h4>
              <p className="text-gray-700 text-sm mb-3">
                ハードウェアに近い形式で、詳細な制御が可能だが難解な言語。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-xs font-medium block mb-1">例：</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    C
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    C++
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    アセンブラ
                  </div>
                  <div className="bg-blue-50 rounded p-1 text-center text-xs">
                    機械語
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-3">コード実行の種類</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">コンパイル型言語</h4>
              <p className="text-gray-700 text-sm mb-2">
                ソースコードを事前に機械語に変換（コンパイル）し、実行ファイルを作成。実行時はコンパイル済みの機械語を直接実行するため高速。
              </p>
              <div className="text-xs text-gray-600">例：C, C++, Go, Rust</div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">
                インタプリタ型言語
              </h4>
              <p className="text-gray-700 text-sm mb-2">
                ソースコードを1行ずつ解釈しながら実行。事前変換は不要で開発が容易だが、実行速度は一般的に遅い。
              </p>
              <div className="text-xs text-gray-600">
                例：Python, JavaScript, Ruby
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          ソースコードから実行までの流れ
        </h3>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="relative mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* ソースコード */}
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center h-full">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  1
                </div>
                <h4 className="font-bold text-gray-800 mb-2">ソースコード</h4>
                <p className="text-xs text-gray-600 mb-3">
                  人間が読み書きできる形式のプログラム
                </p>
                <div className="bg-white p-2 rounded border border-gray-200 w-full mt-auto">
                  <pre className="text-xs text-blue-700 whitespace-pre-wrap break-words overflow-x-auto">
                    {`function hello() {\n  console.log("Hello");\n}`}
                  </pre>
                </div>
              </div>

              {/* 変換処理 */}
              <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center text-center h-full">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  2
                </div>
                <h4 className="font-bold text-gray-800 mb-2">変換処理</h4>
                <p className="text-xs text-gray-600 mb-3">
                  コンパイラまたはインタプリタによる変換
                </p>
                <BiCodeAlt size={32} className="text-yellow-600 mb-2" />
                <div className="text-xs text-gray-800 mt-auto">
                  字句解析→構文解析→意味解析→最適化
                </div>
              </div>

              {/* 中間コード */}
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center h-full">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  3
                </div>
                <h4 className="font-bold text-gray-800 mb-2">中間コード</h4>
                <p className="text-xs text-gray-600 mb-3">
                  多くの言語では中間形式を生成
                </p>
                <div className="bg-white p-2 rounded border border-gray-200 w-full mt-auto">
                  <pre className="text-xs text-green-700 whitespace-pre-wrap break-words overflow-x-auto">
                    {`LOAD_CONST 1 (Hello)\nCALL_METHOD console.log\nRETURN_VALUE`}
                  </pre>
                </div>
              </div>

              {/* 機械語 */}
              <div className="bg-red-50 p-4 rounded-lg flex flex-col items-center text-center h-full">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-2">
                  4
                </div>
                <h4 className="font-bold text-gray-800 mb-2">機械語</h4>
                <p className="text-xs text-gray-600 mb-3">
                  CPUが直接実行できるバイナリコード
                </p>
                <div className="bg-white p-2 rounded border border-gray-200 w-full mt-auto">
                  <pre className="text-xs text-red-700 whitespace-pre-wrap break-words overflow-x-auto">
                    {`01001000 01100101 01101100 01101100 01101111 00100001`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h4 className="font-bold text-gray-800 mt-6 mb-3">
            プログラム実行時の流れ
          </h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 pl-4">
            <li>OSがプログラムをメモリにロード</li>
            <li>CPU命令ポインタがプログラムの開始アドレスを指す</li>
            <li>CPUが命令をフェッチ（取得）</li>
            <li>命令をデコード（解読）</li>
            <li>命令を実行</li>
            <li>結果を保存</li>
            <li>次の命令に進む（3〜6を繰り返す）</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-8">
          <h3 className="font-bold text-blue-800 mb-3">
            実行の違い: コンパイルとインタプリタ
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <BiChip className="text-blue-600" size={18} />
                </div>
                コンパイル型の実行過程
              </h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </div>
                  <div className="text-sm">ソースコードを書く (hello.c)</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </div>
                  <div className="text-sm">
                    コンパイラがソースコードを機械語に変換
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </div>
                  <div className="text-sm">
                    実行ファイルが生成される (hello.exe)
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </div>
                  <div className="text-sm">実行ファイルを直接実行</div>
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                実行時にソースコードは不要。一度コンパイルすれば何度でも実行できる。
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <div className="bg-yellow-100 rounded-full p-1 mr-2">
                  <BiCodeAlt className="text-yellow-600" size={18} />
                </div>
                インタプリタ型の実行過程
              </h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <div className="bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </div>
                  <div className="text-sm">ソースコードを書く (hello.py)</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </div>
                  <div className="text-sm">
                    インタプリタがソースコードを読み込む
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </div>
                  <div className="text-sm">ソースコードを1行ずつ解釈・実行</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </div>
                  <div className="text-sm">実行結果を出力</div>
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                実行時にソースコードが必要。実行のたびに解釈処理が行われる。
              </div>
            </div>
          </div>
        </div>

        {/* 理解度チェックボタン */}
        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded mb-6 mt-10">
          理解度チェッククイズに挑戦
        </button>

        <Feedback />
      </div>
    </section>
  );
}
