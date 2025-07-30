import { quizData } from "../../data/quizData"; // 適切なパスに変更してください
import QuizClient from "../../components/QuizClient";
import Footer from "@/app/components/Footer";

const allQuestions = quizData.flatMap(chapter => chapter.questions);

function findChapterAndQuestion(number) {
  let count = 0;
  for (const chapter of quizData) {
    if (number < count + chapter.questions.length) {
      return {
        chapter,
        questionIndexInChapter: number - count,
      };
    }
    count += chapter.questions.length;
  }
  return null;
}

export default function QuizPage({ params }) {
  const questionNumber = parseInt(params.number, 10) - 1;
  const totalQuestions = allQuestions.length;

  const found = findChapterAndQuestion(questionNumber);
  if (!found) {
    return <p>質問が見つかりませんでした。</p>;
  }

  const { chapter, questionIndexInChapter } = found;
  const question = chapter.questions[questionIndexInChapter];

  return (
    <>
     <div style={{ marginBottom: "4rem" }}> {/* フッターの高さ分マージン確保 */}
      <QuizClient
        question={question}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        chapterTitle={chapter.title}
        chapterIntro={chapter.intro}
      />
    </div>

    <Footer/>
    </>
  );
}
