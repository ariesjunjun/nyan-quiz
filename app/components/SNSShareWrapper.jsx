"use client";

import { useEffect, useState } from "react";
import SNSShareButtons from "./SNSShareButtons";

export default function SNSShareWrapper({ title }) {
  // 現在のページURLを状態管理するためのstate
  const [url, setUrl] = useState("");

  // コンポーネントがクライアント側でマウントされたときに実行
  useEffect(() => {
    // windowオブジェクトが存在するか確認（サーバーサイドレンダリング対策）
    if (typeof window !== "undefined") {
      // 現在のページのURLを取得し、stateにセット
      setUrl(window.location.href);
    }
  }, []); // 空配列なので初回マウント時のみ実行

  // URLがまだ取得できていない場合は何も表示しない（nullを返す）
  if (!url) return null;

  // URLが取得できたらSNSシェアボタンコンポーネントにURLとタイトルを渡して表示
  return <SNSShareButtons url={url} title={title} />;
}
