import ResultClient from "../../components/ResultClient"; // クイズ結果表示のクライアントコンポーネント
import { Suspense } from "react"; // Reactの遅延読み込み用コンポーネント
import SNSShareWrapper from "@/app/components/SNSShareWrapper"; // SNSシェア用のURL取得ラッパーコンポーネント

export default function ResultPage() {
  const title = "この記事をシェアしよう"; // シェア時に使うタイトルテキスト

  return (
    <>
      {/* SuspenseでResultClientの読み込みを遅延表示。読み込み中は「読み込み中...」と表示 */}
      <Suspense fallback={<div>読み込み中...</div>}>
        <ResultClient />
      </Suspense>

      <hr />

      {/* SNSシェアボタンを表示するエリア */}
      <div
        style={{
          textAlign: "center",      // 中央寄せ
          marginTop: "2rem",        // 上余白
          marginBottom: "3rem",     // 下余白
        }}
      >
        <p
          style={{
            fontWeight: "bold",     // 太字
            marginBottom: "1rem",   // 下余白
          }}
        >
          ＼ SNSで結果をシェアしよう ／
        </p>
        {/* URLを動的に取得してSNSシェアボタンを表示 */}
        <SNSShareWrapper title={title} />
      </div>
    </>
  );
}
