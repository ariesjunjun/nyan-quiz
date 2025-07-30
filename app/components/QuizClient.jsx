"use client"; // クライアントコンポーネントとして明示（Next.js 13以降）

import { useRouter, useSearchParams } from "next/navigation"; // ルーターとクエリパラメータ取得
import React, { useEffect, useState } from "react";
import { quizData } from "../data/quizData";
import { M_PLUS_Rounded_1c } from 'next/font/google';
import Image from 'next/image';


// Googleフォントの読み込み（日本語は 'japanese' ではなく 'latin-ext' を使用）
const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
});

// 全章のすべての問題を1つの配列に展開
const allQuestions = quizData.flatMap(chapter => chapter.questions);

export default function QuizClient({
  chapterTitle,     // 章のタイトル
  chapterIntro,     // 章の説明文
  question,         // 現在の問題
  questionNumber,   // 現在の問題番号
  totalQuestions,   // 全体の問題数
}) {
  const router = useRouter();               // ページ遷移用
  const searchParams = useSearchParams();   // URLクエリパラメータから回答履歴を取得

  const [answers, setAnswers] = useState([]); // ユーザーの回答履歴を保存

  // 初回レンダリング時にクエリから回答履歴を読み取る
  useEffect(() => {
    const answersQuery = searchParams.get("answers") || "";
    const parsedAnswers = answersQuery
      ? answersQuery.split(",").map(Number)
      : [];
    setAnswers(parsedAnswers);
  }, [searchParams]);

  // 回答ボタンが押されたときの処理
  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers, optionIndex];

    if (questionNumber + 1 < totalQuestions) {
      router.push(`/quiz/${questionNumber + 2}?answers=${newAnswers.join(",")}`);
    } else {
      const score = calculateScore(newAnswers);
      router.push(`/quiz/result?score=${score}&total=${totalQuestions}`);
    }
  };

  // 回答スコアを計算
  const calculateScore = (userAnswers) => {
    let score = 0;
    userAnswers.forEach((answer, i) => {
      if (answer === allQuestions[i]?.answer) score++;
    });
    return score;
  };

  // 問題が存在しないときのエラーメッセージ
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
        maxWidth: "768px",          // 最大幅
        margin: "0 auto",           // 中央寄せ
        padding: "2.5rem 1.5rem",   // パディング
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* ヘッダー部分 */}
      <header
        style={{
          marginBottom: "2rem",
          textAlign: "center",
          flexShrink: 0,
          minHeight: "190px",
        }}
      >
        <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // 中央揃え
    gap: "0.5rem",            // 画像と文字の間にスペース
    marginBottom: "0.5rem",   // 下の余白
  }}
>
<Image
    src="/icon.svg" // アイコン画像のパス
    alt="タイトルアイコン"
    width={50}   // ここに幅（ピクセル）を数値で指定
    height={50}  // ここに高さ（ピクセル）を数値で指定
    style={{
      width: "20px",  // お好みでサイズ調整
      height: "20px",
    }}
  />
  <h1
    style={{
      fontSize: "1.4rem",
      fontWeight: "800",
      color: "#4a2710",
      margin: 0, // 不要なマージンをなくす
    }}
    className={mPlusRounded.className}
  >
    {chapterTitle}
  </h1>
</div>
        <p
          style={{
            fontSize: "1.125rem", // 約18px
            color: "#4b5563",     // 灰色
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {chapterIntro}
        </p>

{/* 問題ごとの画像 */}
{question.image && (
  <div
    style={{
      marginTop: "1rem",
    }}
  >
    <Image
      src={question.image}
      alt="問題に関連する画像"
      width={100}    // 適切な幅を指定
      height={100}   // 適切な高さを指定
      style={{
        display: "block",
        margin: "0 auto",
        maxWidth: "20%",
        height: "auto",
        borderRadius: "0.5rem",
      }}
    />
  </div>
)}


      </header>

      {/* 問題本体 */}
      <main
        style={{
          backgroundColor: "white",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          borderRadius: "0.5rem",
          padding: "2rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* 問題文と番号 */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.5rem", // 約24px
              fontWeight: "600",
              color: "#374151",   // グレー
              marginBottom: "0.5rem",
            }}
          >
            Q{questionNumber + 1} / {totalQuestions}
          </h2>
          <p
            style={{
              color: "#374151",
              fontSize: "1.125rem", // 約18px
              margin: 0,
            }}
          >
            {question.question}
          </p>
        </div>

        {/* 選択肢 */}
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "1rem",
          display: "flex",
          flexDirection: "column"
        }}>
          {question.options.map((option, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleAnswer(idx)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "1px solid #4a2710", // 薄いグレーの枠
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  color: "#4a2710", //茶色
                  fontWeight: "500",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  // ホバー時に色を変更
                  e.currentTarget.style.backgroundColor = "#51884b"; // 緑
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  // マウス離脱で元に戻す
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#4a2710"; //茶色
                }}
                onFocus={(e) => {
                  // フォーカス時の視認性向上
                  e.currentTarget.style.outline = "4px solid #d3b4a0"; // 薄い茶色
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  // フォーカスアウト時にリセット
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
