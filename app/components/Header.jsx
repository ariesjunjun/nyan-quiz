// app/components/Header.jsx
"use client"; // クライアントコンポーネントであることを明示

import Link from "next/link";
import { useRouter } from "next/navigation";
import { M_PLUS_Rounded_1c } from 'next/font/google';

// Googleフォント M PLUS Rounded 1c を読み込み（400と700のウェイトのみ使用）
const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin', 'latin-ext'],  // 'japanese' は非対応なので除外
  weight: ['400', '700'],
});

// ヘッダーコンポーネント（トップに戻るリンク付き）
export default function Header({ onReset }) {
  const router = useRouter();

  // タイトルやサブタイトルをクリックしたときの動作（状態リセット＋ホームへ遷移）
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onReset === "function") onReset(); // リセット関数が渡されていれば実行
    router.push("/"); // トップページへ遷移
  };

  return (
    <header
      style={{
        padding: "2rem 1rem", // 上下に余裕を持たせた余白
        backgroundColor: "var(--main-bg)", // メインテーマの背景色（CSS変数）
        textAlign: "center", // コンテンツを中央揃え
        color: "#FFF", // テキストの色を白に
        letterSpacing: "0.05em", // 文字の間隔を少し広めに
      }}
    >
      {/* メインタイトル */}
      <h1
        style={{ margin: "0 0 0.5rem", fontSize: "2rem", fontWeight: "bold" }}
        className={mPlusRounded.className} // 丸ゴシックフォントを適用
      >
        <Link
          href="/"
          onClick={handleClick} // 状態リセットしてトップへ戻る
          style={{
            color: "#FFF", // 白文字
            textDecoration: "none", // 下線を消す
            cursor: "pointer",
            letterSpacing: "0.1em", // タイトル文字はやや広めに
          }}
        >
          保護猫譲渡大作戦！
        </Link>
      </h1>

      {/* サブタイトル（制作者クレジット） */}
      <p
        style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}
        className={mPlusRounded.className}
      >
        <Link
          href="/"
          onClick={handleClick}
          style={{
            color: "#FFEBCD", // 柔らかいベージュ色
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          by ニャンズマーケット
        </Link>
      </p>

      {/* 誘導メッセージ */}
      <p
        style={{
          color: "#000", // 黒文字で目立たせる
          fontSize: "1rem",
          margin: 0,
        }}
      >
        クイズに答えて<br />
        保護猫譲渡ミッションをクリアせよ！
      </p>
    </header>
  );
}
