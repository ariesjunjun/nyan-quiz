"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import React from "react";

export default function ResultClient() {

  const formatWithLineBreaks = (text) =>
    text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);

  const percentage = Math.round((score / total) * 100);

  const getResultMessage = (percentage) => {
    if (percentage === 100) return "パーフェクト！\n猫博士だニャ！";
    if (percentage >= 80) return "すごいニャ！\nよく知ってるね！";
    if (percentage >= 50) return "まあまあニャ！\nもっと知ってほしいニャ～";
    return "まだまだニャ。\n知識をつけてまた来てニャン";
  };

  // ★ 画像上の結果タイトルメッセージを返す関数を追加
const getResultTitle = (percentage) => {
  if (percentage === 100) return "🎉 ミッションクリア！\n譲渡成功！";
  if (percentage >= 80) return "👏 惜しいニャ！\n譲渡成功ならず・・・";
  if (percentage >= 50) return "😸 譲渡への道は\nあと一歩ニャ";
  return "😿 ミッション失敗！\n諦めずに再挑戦してニャ！";
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
  {formatWithLineBreaks(getResultTitle(percentage))}
</h2>

      {/* ★ 結果画像の表示 */}
      <Image
  src={getResultImage(percentage)}
  alt="結果画像"
  width={500}   // ここに幅（ピクセル）を数値で指定
  height={500}  // ここに高さ（ピクセル）を数値で指定
  style={{
    display: "block",
    margin: "0 auto 1.5rem",
    width: "300px",     // ← 固定サイズにする（正方形）
    height: "300px",    // ← 高さも指定
    borderRadius: "50%",
    objectFit: "cover",  // ← はみ出し防止
    backgroundColor: "#fff",
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
  {formatWithLineBreaks(getResultMessage(percentage))}
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
