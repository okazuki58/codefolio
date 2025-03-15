import Image from "next/image";
import {
  BiRightArrowAlt,
  BiLock,
  BiWifi,
  BiServer,
  BiCode,
  BiGlobe,
  BiDesktop,
} from "react-icons/bi";
import Feedback from "@/app/components/feedback";

export default function InternetBasicsContent() {
  return (
    <div className="max-w-full leading-relaxed">
      <h1 className="text-2xl font-bold mb-6">インターネットの基礎知識</h1>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">1. インターネットとは</h2>
        <p className="mb-4 leading-7">
          インターネットとは、世界中のコンピューターやスマートフォンが相互につながり、情報をやり取りできる巨大なネットワークです。私たちが日常的に使うウェブサイト、メール、動画配信などは、すべてこのネットワーク上で動いています。
        </p>

        <div className="mb-6 bg-gray-50 rounded p-4 relative aspect-[16/9] md:h-[400px]">
          <Image
            src="/internet.svg"
            alt="インターネットの全体像"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <h3 className="font-bold mb-3">インターネットの仕組み（簡単に）</h3>

        <h4 className="font-bold mb-2">① クライアントとサーバー</h4>
        <ul className="list-disc pl-5 mb-3 space-y-2 leading-7">
          <li>
            <strong>クライアント</strong>
            ：あなたのスマホやPCなど、サービスを使う側
          </li>
          <li>
            <strong>サーバー</strong>
            ：ウェブページや動画など、サービスを提供する側
          </li>
        </ul>
        <p className="mb-4 leading-7">
          例えば、あなたがGoogleで検索するとき、あなたのPC（クライアント）がGoogleのサーバーに「〇〇を検索したい」というリクエストを送り、サーバーが検索結果を返してきます。
        </p>

        <h4 className="font-bold mb-2">② IPアドレス（住所のようなもの）</h4>
        <p className="mb-4 leading-7">
          インターネット上の全ての機器には「IPアドレス」という番号があります。これは郵便の住所のようなもので、データの送り先を示します。例：192.168.1.1
        </p>

        <h4 className="font-bold mb-2">③ ドメイン名</h4>
        <p className="mb-4 leading-7">
          IPアドレスは覚えにくいので、「google.com」のような名前（ドメイン名）を使います。「DNS」という仕組みが、ドメイン名から実際のIPアドレスを見つけ出します。
        </p>

        <h3 className="font-bold mb-3">
          どうやってウェブサイトが表示されるの？
        </h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2 leading-7">
          <li>ブラウザのアドレスバーに「google.com」と入力します</li>
          <li>ブラウザは「google.com」のIPアドレスを調べます</li>
          <li>そのIPアドレスにリクエストを送信します</li>
          <li>Googleのサーバーがウェブページのデータを返します</li>
          <li>ブラウザがそのデータを画面に表示します</li>
        </ol>
        <p className="mb-4 leading-7">
          これが、私たちがウェブサイトを閲覧するときに裏で起きていることです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">
          2. クライアント・サーバーモデル
        </h2>
        <p className="mb-4 leading-7">
          インターネットの基本的な構造は「クライアント・サーバーモデル」と呼ばれています。このモデルでは、「サービスを提供する側」と「サービスを利用する側」が明確に分かれています。
        </p>

        <div className="mb-6 bg-gray-50 rounded p-4 relative aspect-[16/9]">
          <Image
            src="/internet-basics/intetnet-basics-2.svg"
            alt="クライアント・サーバーモデル"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3">クライアント側</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2 leading-7">
            <li>あなたのスマートフォンやパソコン</li>
            <li>ウェブブラウザなどのアプリケーション</li>
            <li>情報やサービスを「要求する」側</li>
            <li>受け取ったデータを表示・処理する</li>
          </ul>
          <p className="mb-4 leading-7">
            例：ChromeでYouTubeを見るとき、あなたのブラウザがクライアント
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3">サーバー側</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2 leading-7">
            <li>データセンターにある専用のコンピューター</li>
            <li>常に稼働し、リクエストを待っている</li>
            <li>情報やサービスを「提供する」側</li>
            <li>多数のクライアントからの要求に応える</li>
          </ul>
          <p className="mb-4 leading-7">
            例：YouTubeの動画を保存し、配信しているコンピューターがサーバー
          </p>
        </div>

        <h3 className="font-bold mb-3">ポイント：双方向の通信</h3>
        <p className="mb-4 leading-7">
          重要なのは、クライアントとサーバーの間では常に「会話」のようなやり取りが行われていることです。クライアントがリクエスト（要求）を送り、サーバーがレスポンス（応答）を返します。この連続的なやり取りによって、ウェブサイトの閲覧、メールの送受信、オンラインゲームなど、様々なインターネットサービスが実現しています。
        </p>
        <p className="mb-4 leading-7">
          一般的なウェブサイトでは、テキスト、画像、動画などのコンテンツはすべてサーバーに保存されています。あなたがウェブサイトにアクセスすると、これらのデータがサーバーからあなたのデバイス（クライアント）に送信され、ブラウザがそれを表示します。SNSやメールサービスでは、あなたの投稿やメッセージもサーバーに保存され、友達が自分のデバイスでそれを見るときは、同じくサーバーからデータを受け取っています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">3. IPアドレスとドメイン名</h2>
        <h3 className="font-bold mb-3">インターネットの住所システム</h3>
        <p className="mb-4 leading-7">
          インターネット上の各デバイスが相互に通信するためには、お互いを識別する方法が必要です。これが「IPアドレス」と「ドメイン名」の役割です。
        </p>

        <h4 className="font-bold mb-2">IPアドレスとは</h4>
        <p className="mb-4 leading-7">
          IPアドレスは、インターネットに接続されている各デバイスに割り当てられる数字の羅列です。例えば「192.168.1.1」のような形式です。これは郵便番号や住所のようなもので、データを正しい宛先に届けるために使われます。
        </p>
        <div className="bg-gray-100 p-3 rounded text-sm font-mono break-all mb-4 leading-7">
          例：IPv4アドレス：192.168.1.1
          <br />
          例：IPv6アドレス：2001:0db8:85a3:0000:0000:8a2e:0370:7334
        </div>

        <h4 className="font-bold mb-2">ドメイン名とは</h4>
        <p className="mb-4 leading-7">
          IPアドレスは覚えにくいため、「google.com」や「youtube.com」のような「ドメイン名」が発明されました。これは人間が読みやすく、覚えやすい形式です。
        </p>
        <div className="border border-gray-200 rounded p-3 mb-4">
          <div className="mb-2">
            <span className="font-medium">ドメイン名：</span> google.com
          </div>
          <div>
            <span className="font-medium">IPアドレス：</span> 142.250.207.46
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-7">
            ※IPアドレスは変更される場合があります
          </p>
        </div>

        <div className="mb-6 bg-gray-50 rounded p-4 relative aspect-[16/9]">
          <Image
            src="/internet-basics/intetnet-basics-3.svg"
            alt="IPアドレスとドメイン名"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <h3 className="font-bold mb-3">DNSの仕組み</h3>
        <p className="mb-4 leading-7">
          「DNS（Domain Name
          System）」は、ドメイン名をIPアドレスに変換するシステムです。インターネットの「電話帳」のようなものです。
        </p>
        <ol className="list-decimal pl-5 mb-4 space-y-2 leading-7">
          <li>あなたがブラウザで「google.com」と入力します</li>
          <li>
            ブラウザはDNSサーバーに「google.comのIPアドレスを教えて」と問い合わせます
          </li>
          <li>
            DNSサーバーは「google.comのIPアドレスは142.250.207.46です」と答えます
          </li>
          <li>
            ブラウザはそのIPアドレスを使って、Googleのサーバーと通信を始めます
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">4. HTTPとHTTPSの違い</h2>
        <p className="mb-4 leading-7">
          インターネット上でデータをやり取りするときの「言語」として、HTTPとHTTPSというプロトコルが使われています。
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-bold mb-3">HTTP</h3>
            <p className="mb-3 leading-7">
              HTTP（Hypertext Transfer
              Protocol）は、ウェブサイトのデータをやり取りするための基本的な方法です。
            </p>
            <ul className="list-disc pl-5 leading-7">
              <li>暗号化されていない（平文）</li>
              <li>第三者が通信内容を見ることができる可能性がある</li>
              <li>URLは「http://」で始まる</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-bold mb-3">HTTPS</h3>
            <p className="mb-3 leading-7">
              HTTPS（HTTP
              Secure）は、HTTPに暗号化（SSL/TLS）を追加したものです。
            </p>
            <ul className="list-disc pl-5 leading-7">
              <li>データが暗号化されている</li>
              <li>第三者が内容を読み取ることができない</li>
              <li>URLは「https://」で始まる</li>
              <li>ブラウザに鍵マーク（🔒）が表示される</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold mb-3">なぜHTTPSが重要なのか？</h3>
        <p className="mb-3 leading-7">
          HTTPSが特に重要になるのは、以下のような情報をやり取りする場合です：
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2 leading-7">
          <li>パスワードやクレジットカード情報などの個人情報</li>
          <li>オンラインバンキングやショッピングサイトでの取引</li>
          <li>メールやSNSなどのプライベートなメッセージ</li>
        </ul>
        <p className="mb-4 leading-7">
          <strong>覚えておきたいポイント：</strong>{" "}
          最近のウェブサイトの多くはHTTPSを採用していますが、HTTPのサイトもまだ存在します。特に個人情報を入力する場合は、必ずURLが「https://」で始まることと、ブラウザに鍵マーク（🔒）が表示されていることを確認しましょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">5. ブラウザの役割</h2>
        <p className="mb-4 leading-7">
          私たちがインターネットを利用するとき、最も頻繁に使うソフトウェアの一つが「ウェブブラウザ」です。Chrome、Safari、Firefox、Edgeなどがよく知られていますが、ブラウザは単なる表示ツール以上の重要な役割を果たしています。
        </p>

        <h3 className="font-bold mb-3">ブラウザの主な機能</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2 leading-7">
          <li>
            <strong>リクエストの送信</strong>:
            URLを入力すると、そのウェブサイトのサーバーにデータをリクエストします。
          </li>
          <li>
            <strong>データの受信と解釈</strong>:
            サーバーからのHTML、CSS、JavaScriptなどのデータを受け取り、解釈します。
          </li>
          <li>
            <strong>レンダリング</strong>:
            受け取ったデータを画面に表示（レンダリング）します。
          </li>
          <li>
            <strong>JavaScript実行</strong>:
            ウェブページに含まれるJavaScriptを実行し、動的な機能を提供します。
          </li>
          <li>
            <strong>キャッシュ管理</strong>:
            一度読み込んだデータを保存し、次回の表示を高速化します。
          </li>
          <li>
            <strong>Cookieの管理</strong>:
            ログイン情報などを保存し、ウェブサイトがユーザーを記憶できるようにします。
          </li>
        </ol>

        <h3 className="font-bold mb-3">ブラウザの仕組み（簡略版）</h3>
        <ol className="list-decimal pl-5 mb-4 space-y-2 leading-7">
          <li>
            <strong>URLの解析</strong>:
            ブラウザは入力されたURLを解析し、どのプロトコル（http/https）、どのサーバー（ドメイン名）、どのリソース（パス）にアクセスするかを決定します。
          </li>
          <li>
            <strong>DNSルックアップ</strong>:
            ドメイン名（例：google.com）をIPアドレスに変換します。
          </li>
          <li>
            <strong>TCP/IP接続</strong>:
            指定されたIPアドレスのサーバーとの接続を確立します。
          </li>
          <li>
            <strong>HTTPリクエスト</strong>:
            サーバーにHTTPリクエストを送信します。
          </li>
          <li>
            <strong>レスポンス処理</strong>:
            サーバーからのレスポンス（HTML等）を受け取ります。
          </li>
          <li>
            <strong>HTML解析</strong>: HTMLを解析して「DOM（Document Object
            Model）」と呼ばれる構造を構築します。
          </li>
          <li>
            <strong>CSS処理</strong>:
            CSSを適用して、各要素がどのように表示されるかを決定します。
          </li>
          <li>
            <strong>JavaScript実行</strong>:
            ページ内のJavaScriptを実行して、動的な機能を実現します。
          </li>
          <li>
            <strong>レンダリング</strong>:
            最終的なレイアウトを画面に描画します。
          </li>
        </ol>

        <h3 className="font-bold mb-3">主要ブラウザの違い</h3>
        <p className="mb-4 leading-7">
          代表的なブラウザには、Google Chrome、Mozilla
          Firefox、Safari、Microsoft
          Edgeなどがあります。基本的な機能は同じですが、細かい点で違いがあります：
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2 leading-7">
          <li>
            <strong>レンダリングエンジン</strong>:
            ブラウザごとに異なるレンダリングエンジンを使用しており、同じWebサイトでも微妙に表示が異なることがあります。
          </li>
          <li>
            <strong>JavaScript実行速度</strong>:
            ブラウザによってJavaScriptの処理速度に差があります。
          </li>
          <li>
            <strong>機能と拡張性</strong>:
            プラグインやエクステンションのサポート、セキュリティ機能などが異なります。
          </li>
          <li>
            <strong>同期と連携</strong>: Googleアカウント（Chrome）やApple
            ID（Safari）などと連携して、複数デバイス間でブックマークやパスワードを同期する機能があります。
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">6. ウェブページの表示手順</h2>
        <p className="mb-4 leading-7">
          最後に、これまで学んだ内容を総合して、「あるウェブページが表示されるまでの全体の流れ」を見ていきましょう。例として、「https://example.com」というサイトにアクセスする場合を考えます。
        </p>

        <ol className="list-decimal pl-5 mb-4 space-y-2 leading-7">
          <li>
            <strong>URLの入力</strong>:
            ユーザーがブラウザのアドレスバーに「https://example.com」と入力し、Enterキーを押します。
          </li>
          <li>
            <strong>DNSルックアップ</strong>:
            ブラウザは「example.com」というドメイン名に対応するIPアドレスを調べるため、DNSサーバーに問い合わせます。まず、ブラウザのキャッシュ、次にOSのキャッシュ、最後にISPのDNSサーバーという順番で確認します。
          </li>
          <li>
            <strong>TCP/IP接続</strong>:
            DNSから得たIPアドレスを使って、ブラウザはサーバーとTCP接続を確立します。HTTPSの場合は、TLSハンドシェイク（暗号化通信の準備）も行われます。
          </li>
          <li>
            <strong>HTTPリクエスト送信</strong>:
            ブラウザはサーバーにHTTPリクエストを送信します。このリクエストには「どのページが欲しいのか」「どのブラウザを使っているのか」などの情報が含まれます。
          </li>
          <li>
            <strong>サーバーの処理</strong>:
            サーバーはリクエストを受け取り、処理します。静的なページの場合はHTMLファイルを返し、動的なページの場合はプログラム（PHP、Python、Node.jsなど）を実行してHTMLを生成します。
          </li>
          <li>
            <strong>レスポンス受信</strong>:
            サーバーからのHTTPレスポンスをブラウザが受信します。レスポンスには状態コード（200：成功、404：ページが見つからないなど）とHTML、CSS、JavaScriptなどのデータが含まれます。
          </li>
          <li>
            <strong>HTML解析とDOM構築</strong>:
            ブラウザはHTMLを解析し、DOM（Document Object
            Model）と呼ばれるツリー構造を構築します。これはウェブページの構造を表現するものです。
          </li>
          <li>
            <strong>リソースの取得</strong>:
            HTMLの解析中に、ブラウザはCSSファイル、JavaScriptファイル、画像などの追加リソースを見つけると、それらを取得するための追加リクエストを送信します。
          </li>
          <li>
            <strong>CSSの処理とレンダーツリーの構築</strong>:
            ブラウザはCSSを解析し、DOMと組み合わせて「レンダーツリー」を構築します。これは、各要素がどのように表示されるかを定義します。
          </li>
          <li>
            <strong>レイアウトとペインティング</strong>:
            ブラウザは、レンダーツリーに基づいて各要素の正確な位置とサイズを計算（レイアウト）し、画面上にピクセルとして描画（ペインティング）します。
          </li>
          <li>
            <strong>JavaScriptの実行</strong>:
            ブラウザはJavaScriptを実行し、DOMの操作、イベントの設定、動的なコンテンツの生成などを行います。これによってウェブページにインタラクティブな機能が追加されます。
          </li>
          <li>
            <strong>ウェブページの完成</strong>:
            すべての処理が完了すると、ユーザーは完全に表示されたウェブページを見ることができます。その後も、ユーザーの操作（スクロール、クリックなど）に応じて、ブラウザは継続的に画面を更新します。
          </li>
        </ol>

        <h3 className="font-bold mb-3">高度な最適化テクニック</h3>
        <p className="mb-3 leading-7">
          現代のウェブ開発では、このプロセスをより高速化するためのさまざまな手法が使われています：
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2 leading-7">
          <li>
            <strong>コンテンツ配信ネットワーク (CDN)</strong>:
            世界中にサーバーを配置して、ユーザーに最も近いサーバーからコンテンツを配信する
          </li>
          <li>
            <strong>プリロード/プリフェッチ</strong>:
            必要になりそうなリソースを事前に読み込んでおく
          </li>
          <li>
            <strong>レイジーローディング</strong>:
            画面に表示されるまでリソース（特に画像）の読み込みを遅らせる
          </li>
          <li>
            <strong>コード分割</strong>:
            JavaScriptを小さなチャンクに分割し、必要なときだけ読み込む
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">全体のまとめ</h2>
        <p className="mb-4 leading-7">
          これまで見てきたように、ウェブページが表示されるまでには、多くの技術が連携して働いています。インターネットの仕組みを理解することで、以下のようなメリットがあります：
        </p>

        <ul className="mb-6 space-y-3">
          <li className="flex items-start leading-7">
            <BiGlobe
              className="text-blue-600 mr-2 mt-1 flex-shrink-0"
              size={20}
            />
            <span>
              <strong>ウェブ開発への理解が深まる</strong>:
              フロントエンド、バックエンド、ネットワークなど、各技術の役割がわかるようになります
            </span>
          </li>
          <li className="flex items-start leading-7">
            <BiCode
              className="text-blue-600 mr-2 mt-1 flex-shrink-0"
              size={20}
            />
            <span>
              <strong>パフォーマンス最適化ができる</strong>:
              ボトルネックがどこにあるかを理解し、適切な改善策を講じることができます
            </span>
          </li>
          <li className="flex items-start leading-7">
            <BiLock
              className="text-blue-600 mr-2 mt-1 flex-shrink-0"
              size={20}
            />
            <span>
              <strong>セキュリティリスクの理解</strong>:
              各段階で発生し得るセキュリティ上の脅威と、その対策について知ることができます
            </span>
          </li>
          <li className="flex items-start leading-7">
            <BiWifi
              className="text-blue-600 mr-2 mt-1 flex-shrink-0"
              size={20}
            />
            <span>
              <strong>トラブルシューティング能力の向上</strong>:
              問題が発生したとき、どのレイヤーで起きているのかを特定しやすくなります
            </span>
          </li>
        </ul>

        <p className="mb-6 leading-7">
          インターネットとウェブの仕組みは常に進化しています。HTTP/3、5G、WebAssemblyなど、新しい技術が次々と登場し、より高速で安全、機能的なウェブ体験を実現しています。基本的な仕組みを理解していれば、こうした新技術も理解しやすくなるでしょう。
        </p>
      </section>

      <button className="w-full bg-blue-600 text-white font-bold py-3 rounded mb-6">
        理解度チェッククイズに挑戦
      </button>

      <Feedback />
    </div>
  );
}
