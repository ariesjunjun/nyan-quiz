"use client";
import { useState } from "react";
import Quiz from "./Quiz";
import { useRouter } from "next/navigation";
import { quizData } from "../data/quizData";

export default function QuizApp({ number }) {
  const chapterIndex = parseInt(number) - 1;
  const questions = quizData[chapterIndex]?.questions || [];
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  // quizData.jsのインポート先などで展開
const allQuestions = quizData.flatMap(chapter => chapter.questions);


  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // クイズ終了 → 結果ページに移動（URLにスコアをクエリとして渡すなど）
      router.push(`/quiz/result?page=${number}&score=${score + (isCorrect ? 1 : 0)}`);
    }
  };

  return (
    <div>
      <h1>クイズ {number} / {questions.length}</h1>
      <Quiz question={questions[current]} onAnswer={handleAnswer} />
    </div>
  );
}
