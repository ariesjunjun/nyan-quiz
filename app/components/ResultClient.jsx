"use client"; // クライアントコンポーネントとして明示（Next.js 13以降）

import { useSearchParams } from "next/navigation"; // URLのクエリパラメータを取得するためのフック
import Link from "next/link"; // Next.jsのリンクコンポーネント
import Image from 'next/image'; // Next.jsの画像最適化コンポーネント
import React from "react"; // Reactライブラリ（React.Fragment使用のため）

export default function ResultClient() {
  // テキスト内の改行コード \n を <br /> に変換する関数
  const formatWithLineBreaks = (text) =>
    text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  // URLクエリパラメータを取得
  const searchParams = useSearchParams();

  // クエリパラメータからスコアと全問数を取得。存在しなければデフォルト値
  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);

  // 正答率（パーセント）を計算して四捨五入
  const percentage = Math.round((score / total) * 100);

  // 結果メッセージ（点数に応じて変わる）を返す関数
  const getResultMessage = (percentage) => {
    if (percentage === 100) return "パーフェクト！\n猫博士だニャ！";
    if (percentage >= 80) return "すごいニャ！\nよく知ってるね！";
    if (percentage >= 50) return "まあまあニャ！\nもっと知ってほしいニャ～";
    return "まだまだニャ。\n知識をつけてまた来てニャン";
  };

  // 画像上に表示するタイトルメッセージを返す関数
  const getResultTitle = (percentage) => {
    if (percentage === 100) return "🎉 ミッションクリア！\n譲渡成功！";
    if (percentage >= 80) return "👏 惜しいニャ！\n譲渡成功ならず・・・";
    if (percentage >= 50) return "😸 譲渡への道は\nあと一歩ニャ";
    return "😿 ミッション失敗！\n諦めずに再挑戦してニャ！";
  };

  // パーセントに応じて表示する画像のパスを返す関数
  const getResultImage = (percentage) => {
    if (percentage === 100) return "/images/perfect.png";
    if (percentage >= 80) return "/images/great.png";
    if (percentage >= 50) return "/images/normal.png";
    return "/images/try_again.png";
  };

  // プログレスバー（外枠）のスタイル
  const progressBarContainerStyle = {
    width: "80%",                  // 横幅は画面幅の80%
    maxWidth: "400px",             // 最大幅400pxで大きすぎないように制限
    height: "20px",                // 高さ20pxで細長いバーに
    backgroundColor: "#ddd",       // 薄いグレーの背景色
    borderRadius: "10px",          // 角丸にして柔らかい印象に
    margin: "0 auto 1rem",         // 上下マージンは0、下に1rem空けて中央寄せ
    overflow: "hidden",            // 中のバーがはみ出さないように隠す
  };

  // プログレスバー（進捗部分）のスタイル
  const progressBarFillStyle = {
    height: "100%",                // 高さは親と同じ20pxに
    width: `${percentage}%`,       // 正答率に合わせて横幅を動的に変える
    backgroundColor: "#d7a14b",   // ブランドカラーの黄色っぽい色
    borderRadius: "10px 0 0 10px", // 左側の角だけ丸く（右側は直角）
    transition: "width 0.5s ease", // 横幅変化にアニメーションを付ける
  };

  return (
    <div
      style={{
        maxWidth: "600px",          // 全体の最大幅600pxに制限
        margin: "0 auto",           // ページ中央に配置
        padding: "2rem 1rem",       // 上下に2rem、左右に1remの余白を確保
        textAlign: "center",        // テキストを中央寄せ
        fontFamily: "sans-serif",   // フォントは読みやすいサンセリフ体に
      }}
    >

      {/* 画像の上に表示する結果タイトル */}
      <h2
        style={{
          fontSize: "1.25rem",      // フォントサイズは約20px
          fontWeight: "bold",       // 太字で目立たせる
          marginBottom: "0.5rem",   // 下に少し間隔を空ける
        }}
      >
        {/* 改行コードをbrに変換して表示 */}
        {formatWithLineBreaks(getResultTitle(percentage))}
      </h2>

      {/* 結果画像の表示 */}
      <Image
        src={getResultImage(percentage)} // 画像パス
        alt="結果画像"                   // 画像が表示できない場合の代替テキスト
        width={500}                      // 画像の元サイズの幅(px)
        height={500}                     // 画像の元サイズの高さ(px)
        style={{
          display: "block",             // ブロック表示にして余白コントロールしやすく
          margin: "0 auto 1.5rem",     // 中央寄せ＆下に1.5remの余白
          width: "300px",               // 表示時の横幅を固定
          height: "300px",              // 表示時の高さも固定
          borderRadius: "50%",          // 画像を丸く切り抜き（円形）
          objectFit: "cover",           // 画像の縦横比を維持しつつはみ出し防止
          backgroundColor: "#fff",      // 背景色を白に設定（透過画像対策）
        }}
      />

      {/* 正答数表示 */}
      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        {total}問中 {score}問正解！ ({percentage}%)
      </p>

      {/* プログレスバー */}
      <div style={progressBarContainerStyle}>
        <div style={progressBarFillStyle}></div>
      </div>

      {/* 結果メッセージ表示 */}
      <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
        {/* 改行コードをbrに変換して表示 */}
        {formatWithLineBreaks(getResultMessage(percentage))}
      </p>

      {/* 最初のページへ戻るリンク */}
      <Link href="/">
        <button
          style={{
            backgroundColor: "#51884b",         // ボタンの背景色（緑系）
            color: "white",                     // 文字色は白でコントラストを強調
            padding: "0.5rem 1rem",             // 上下0.5rem、左右1remの余白
            borderRadius: "0.375rem",           // 少し丸みをつけた角丸
            border: "none",                     // ボーダーなし
            cursor: "pointer",                  // カーソルを指マークにしてクリック可能を示す
            transition: "background-color 0.3s ease", // 背景色変化のトランジション
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3d6b3a")} // ホバー時に濃い緑に変化
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#51884b")}    // ホバー解除時に元色に戻す
        >
          最初に戻る
        </button>
      </Link>
    </div>
  );
}
