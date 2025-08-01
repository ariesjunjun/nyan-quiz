"use client"; // クライアントコンポーネントとして明示（Next.js 13以降）

// Next.jsのルーターとURLクエリパラメータ取得用フック
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { quizData } from "../data/quizData"; // クイズデータの読み込み
import { M_PLUS_Rounded_1c } from "next/font/google"; // Googleフォントの読み込み
import Image from "next/image"; // 画像表示用コンポーネント

// Googleフォントの設定（日本語は 'latin-ext' を使用）
const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

// 全チャプターの全問題を一つの配列に展開（回答スコア計算用）
const allQuestions = quizData.flatMap((chapter) => chapter.questions);

// メインのクイズクライアントコンポーネント
export default function QuizClient({
  chapterTitle,    // 章タイトル（例：「第1章 保護猫の基礎知識」など）
  chapterIntro,    // 章の説明文（イントロダクション）
  question,        // 現在表示している問題オブジェクト
  questionNumber,  // 現在の問題番号（0始まり）
  totalQuestions,  // 全問題数
}) {
  const router = useRouter();         // ページ遷移用ルーター
  const searchParams = useSearchParams(); // URLのクエリパラメータ取得用

  const [answers, setAnswers] = useState([]); // ユーザーの回答履歴（選択肢のインデックス）

  // 初回レンダリング時、URLクエリから回答履歴を読み込み、状態にセット
  useEffect(() => {
    const answersQuery = searchParams.get("answers") || "";
    const parsedAnswers = answersQuery
      ? answersQuery.split(",").map(Number) // カンマ区切りを数値配列に変換
      : [];
    setAnswers(parsedAnswers);
  }, [searchParams]);

  // ユーザーが選択肢をクリックしたときの処理
  const handleAnswer = (optionIndex) => {
    // 新しい回答履歴を作成（現在の履歴に追加）
    const newAnswers = [...answers, optionIndex];

    if (questionNumber + 1 < totalQuestions) {
      // 次の問題がある場合はページ遷移しつつ回答履歴をクエリにセット
      router.push(
        `/quiz/${questionNumber + 2}?answers=${newAnswers.join(",")}`
      );
    } else {
      // 最終問題の場合はスコアを計算して結果ページへ遷移
      const score = calculateScore(newAnswers);
      router.push(`/quiz/result?score=${score}&total=${totalQuestions}`);
    }
  };

  // 回答履歴を元に正解数を計算する関数
  const calculateScore = (userAnswers) => {
    let score = 0;
    userAnswers.forEach((answer, i) => {
      if (answer === allQuestions[i]?.answer) score++;
    });
    return score;
  };

  // 問題データが無い場合のエラーメッセージ表示
  if (!question) {
    return (
      <p style={{ textAlign: "center", color: "#dc2626", marginTop: "2rem" }}>
        問題が読み込めませんでした。
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: "768px",     // 最大幅を指定して中央に寄せる
        margin: "0 auto",
        padding: "2.5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* ヘッダー部分：章タイトルとイントロダクション */}
      <header
        style={{
          marginBottom: "2rem",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // 中央揃え
            gap: "0.5rem",             // アイコンと文字の間隔
            marginBottom: "0.5rem",
          }}
        >
          {/* タイトル横のアイコン画像 */}
          <Image
            src="/icon.svg"
            alt="タイトルアイコン"
            width={50}  // 元画像の幅（ピクセル）
            height={50} // 元画像の高さ（ピクセル）
            style={{
              width: "20px",  // 実際の表示幅（調整可能）
              height: "20px",
            }}
          />
          {/* 章タイトル */}
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: "800",
              color: "#4a2710",
              margin: 0,
            }}
            className={mPlusRounded.className} // Googleフォント適用
          >
            {chapterTitle}
          </h1>
        </div>
        {/* 章の説明文 */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            margin: 0,
            whiteSpace: "pre-line", // 改行を反映
          }}
        >
          {chapterIntro}
        </p>

        {/* 問題に画像がある場合のスペース（今は空のdiv） */}
        {question.image && (
          <div
            style={{
              marginTop: "1rem",
            }}
          ></div>
        )}
      </header>

      {/* 問題本体部分 */}
      <main
        style={{
          backgroundColor: "white",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          borderRadius: "0.5rem",
          padding: "2rem 2rem 2rem 2rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* 問題画像 */}
        <Image
          src={question.image}
          alt="問題に関連する画像"
          width={100} // 表示サイズ
          height={100}
          style={{
            paddingBottom: "1rem",
            display: "block",
            margin: "0 auto",
            maxWidth: "20%",
            height: "auto",
            borderRadius: "0.5rem",
          }}
        />

        {/* 問題番号と問題文 */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Q{questionNumber + 1} / {totalQuestions}
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#374151",
              fontSize: "1.125rem",
              margin: 0,
            }}
          >
            {question.question}
          </p>
        </div>

        {/* 選択肢リスト */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {question.options.map((option, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleAnswer(idx)} // 回答時の処理
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "1px solid #4a2710",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  color: "#4a2710",
                  fontWeight: "500",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                  userSelect: "none", // テキスト選択不可
                }}
                onMouseEnter={(e) => {
                  // ホバー時背景と文字色変更
                  e.currentTarget.style.backgroundColor = "#51884b";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  // ホバー解除で元に戻す
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#4a2710";
                }}
                onFocus={(e) => {
                  // フォーカス時アウトライン表示でアクセシビリティ向上
                  e.currentTarget.style.outline = "4px solid #d3b4a0";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  // フォーカスアウト時にアウトラインを消す
                  e.currentTarget.style.outline = "none";
                  e.currentTarget.style.outlineOffset = "0";
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
