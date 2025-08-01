"use client";

import { useState } from "react";
import Quiz from "./Quiz"; // クイズの問題表示コンポーネント
import { useRouter } from "next/navigation";
import { quizData } from "../data/quizData"; // クイズ問題データのインポート

export default function QuizApp({ number }) {
  // クイズ番号（chapter）から配列インデックスに変換（0始まりに）
  const chapterIndex = parseInt(number) - 1;

  // 対応するチャプターの問題リストを取得。なければ空配列
  const questions = quizData[chapterIndex]?.questions || [];

  const router = useRouter(); // ページ遷移用のNext.jsルーター

  const [current, setCurrent] = useState(0); // 現在の問題番号（0始まり）
  const [score, setScore] = useState(0);     // 現在の正解数

  // 全チャプターの全問題をまとめた配列（今は未使用だが必要なら活用可能）
  const allQuestions = quizData.flatMap(chapter => chapter.questions);

  // ユーザーの回答処理（正誤判定を受け取る）
  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1); // 正解ならスコアをインクリメント

    if (current + 1 < questions.length) {
      // 次の問題へ進む
      setCurrent(current + 1);
    } else {
      // 最終問題なら結果ページへ遷移
      // スコアに今回答えた正誤を加算してURLのクエリに含める
      router.push(`/quiz/result?page=${number}&score=${score + (isCorrect ? 1 : 0)}`);
    }
  };

  return (
    <div>
      {/* 現在のチャプターと問題数の表示 */}
      <h1>クイズ {number} / {questions.length}</h1>

      {/* 問題表示コンポーネントへ現在の問題と回答コールバックを渡す */}
      <Quiz question={questions[current]} onAnswer={handleAnswer} />
    </div>
  );
}
