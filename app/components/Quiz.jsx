"use client";

// Next.jsのルーターを使用
import { useRouter } from "next/navigation";
import { useState } from "react";

// クイズスタート用のボタンコンポーネント
export default function QuizStartButton() {
  const router = useRouter(); // ページ遷移用のルーター
  const [isHover, setIsHover] = useState(false); // ホバー状態の管理

  // クイズの最初のページ（/quiz/1）に遷移
  const handleStartQuiz = () => {
    router.push("/quiz/1");
  };

  return (
    <div
      style={{
        textAlign: "center", // 中央寄せ
        marginTop: "2rem",   // 上に余白
      }}
    >
      {/* クイズ開始ボタン */}
      <button
        onClick={handleStartQuiz} // クリック時にクイズ開始
        onMouseEnter={() => setIsHover(true)} // ホバー時にスタイル変更
        onMouseLeave={() => setIsHover(false)} // ホバー解除時に元に戻す
        style={{
          padding: "1rem 2rem", // 内側の余白（上下1rem、左右2rem）
          fontSize: "1.2rem", // フォントサイズ
          cursor: "pointer", // カーソルをポインターに
          borderRadius: "8px", // ボタンの角を丸くする
          backgroundColor: isHover
            ? "var(--accent-hover)" // ホバー時の背景色
            : "var(--accent)", // 通常時の背景色
          color: "white", // 文字色
          border: "none", // 枠線なし
          transition: "background-color 0.3s ease", // 背景色の変化を滑らかに
        }}
      >
        ミッション開始！
      </button>
    </div>
  );
}
