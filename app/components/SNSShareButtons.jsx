"use client";

import React from "react";

export default function SNSShareButtons({ url, title }) {
  // URLやタイトルをURLエンコードして安全にリンクに埋め込む
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // 各SNSのシェア用URLを作成
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const lineShare = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;

  // ボタンの共通スタイル（pill型の見た目で、影やマウスカーソルなどを設定）
  const baseButtonStyle = {
    display: "inline-block",             // インラインブロックで横並びにできる
    padding: "0.5rem 1.25rem",           // 上下0.5rem、左右1.25remの余白
    borderRadius: "9999px",              // 丸くしてpill型にする
    color: "white",                     // 文字色は白
    fontWeight: "600",                  // やや太字
    textDecoration: "none",             // 下線なし
    fontSize: "1rem",                   // 標準のフォントサイズ
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)", // ほんのり影をつける
    transition: "background-color 0.3s ease", // 背景色変化をなめらかに
    userSelect: "none",                 // テキスト選択禁止（クリック時の見た目向上）
    cursor: "pointer",                  // クリック可能なカーソルにする
    textAlign: "center",                // テキストを中央揃え
  };

  // 各SNSのブランドカラーを適用したスタイルを作成
  const twitterStyle = {
    ...baseButtonStyle,
    backgroundColor: "#1DA1F2",         // Twitterブルー
  };
  const facebookStyle = {
    ...baseButtonStyle,
    backgroundColor: "#3b5998",         // Facebookブルー
  };
  const lineStyle = {
    ...baseButtonStyle,
    backgroundColor: "#00c300",         // LINEグリーン
  };

  return (
    <>
      {/* SNSシェアボタンを横並びに配置するコンテナ */}
      <div
        style={{
          display: "flex",                // 横並びフレックスボックス
          gap: "1rem",                   // ボタン間の隙間1rem
          justifyContent: "center",      // コンテナ内中央揃え
          marginTop: "1.5rem",           // 上部に余白
          flexWrap: "wrap",              // 幅狭いときに折り返す
        }}
      >
        {/* Twitterシェアリンク */}
        <a
          href={twitterShare}             // シェアURL
          target="_blank"                 // 新規タブで開く
          rel="noopener noreferrer"       // セキュリティ対策
          aria-label="Twitterでシェア"    // アクセシビリティ用ラベル
          style={twitterStyle}            // スタイル適用
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d8ddb")} // ホバー時濃い青に
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1DA1F2")} // ホバー解除で元色に戻す
        >
          Twitter
        </a>

        {/* Facebookシェアリンク */}
        <a
          href={facebookShare}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebookでシェア"
          style={facebookStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2d4373")} // ホバー時濃い青に
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b5998")} // 元色に戻す
        >
          Facebook
        </a>

        {/* LINEシェアリンク */}
        <a
          href={lineShare}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LINEでシェア"
          style={lineStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#009900")} // ホバー時濃い緑に
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00c300")} // 元色に戻す
        >
          LINE
        </a>
      </div>
    </>
  );
}
