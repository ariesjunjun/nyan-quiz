"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';

export default function ResultClient() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);

  const percentage = Math.round((score / total) * 100);

  const getResultMessage = (percentage) => {
    if (percentage === 100) return "パーフェクト！猫博士だニャ！";
    if (percentage >= 80) return "すごいニャ！よく知ってるね！";
    if (percentage >= 50) return "まあまあニャ！もっと知ってほしいニャ～";
    return "まだまだニャ。知識をつけてまた来てニャン";
  };

  // ★ 画像上の結果タイトルメッセージを返す関数を追加
const getResultTitle = (percentage) => {
  if (percentage === 100) return "🎉 ミッションクリア！譲渡成功！";
  if (percentage >= 80) return "👏 惜しいニャ！譲渡成功ならず・・・";
  if (percentage >= 50) return "😸 譲渡への道はあと一歩ニャ";
  return "😿 ミッション失敗！諦めずに再挑戦してニャ！";
};

  // ★ 結果に応じた画像パスを決める
  const getResultImage = (percentage) => {
    if (percentage === 100) return "/images/perfect.png";
    if (percentage >= 80) return "/images/great.png";
    if (percentage >= 50) return "/images/normal.png";
    return "/images/try_again.png";
  };

    // ★ プログレスバー
  const progressBarContainerStyle = {
    width: "80%",
    maxWidth: "400px",
    height: "20px",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    margin: "0 auto 1rem",
    overflow: "hidden",
  };

  const progressBarFillStyle = {
    height: "100%",
    width: `${percentage}%`, // ここが動的
    backgroundColor: "#d7a14b",
    borderRadius: "10px 0 0 10px",
    transition: "width 0.5s ease",
  };


  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem 1rem",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >


      {/* 画像の上にタイトル表示 */}
<h2
  style={{
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  }}
>
  {getResultTitle(percentage)}
</h2>

      {/* ★ 結果画像の表示 */}
      <Image
  src={getResultImage(percentage)}
  alt="結果画像"
  style={{
    display: "block",              // センター揃え
    margin: "0 auto 1.5rem",       // 下に余白
    width: "80%",                  // レスポンシブ対応
    maxWidth: "400px",             // 最大サイズ制限
    height: "auto",
  }}
/>


      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        {total}問中 {score}問正解！ ({percentage}%)
      </p>

      {/* 点数表示のすぐ下に追加 */}
<div style={progressBarContainerStyle}>
  <div style={progressBarFillStyle}></div>
</div>


      <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
        {getResultMessage(percentage)}
      </p>

      <Link href="/">
        <button
          style={{
            backgroundColor: "#51884b",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3d6b3a")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#51884b")}
        >
          最初に戻る
        </button>
      </Link>
    </div>
  );
}
