import { quizData } from "../../data/quizData"; // クイズデータのインポート（パスは環境に合わせて調整してください）
import QuizClient from "../../components/QuizClient"; // クイズ本体表示用コンポーネント

// 全ての問題を1つの配列にまとめる（章をまたいでの問題番号管理に使用）
const allQuestions = quizData.flatMap(chapter => chapter.questions);

// 問題番号から対応する章と章内の問題番号を見つける関数
function findChapterAndQuestion(number) {
  let count = 0;
  // 各章を順番にチェック
  for (const chapter of quizData) {
    // number が現在の累積問題数 + 章の問題数未満なら、この章に該当
    if (number < count + chapter.questions.length) {
      return {
        chapter, // 該当章のデータ
        questionIndexInChapter: number - count, // 章内の問題番号（0始まり）
      };
    }
    count += chapter.questions.length; // 累積問題数を更新
  }
  return null; // 見つからなければnullを返す
}

export default function QuizPage({ params }) {
  // URLパラメータのnumberを0始まりの問題番号に変換
  const questionNumber = parseInt(params.number, 10) - 1;

  // クイズ全体の問題数
  const totalQuestions = allQuestions.length;

  // 問題番号から章と章内問題番号を特定
  const found = findChapterAndQuestion(questionNumber);

  // 該当問題がなければメッセージ表示
  if (!found) {
    return <p>質問が見つかりませんでした。</p>;
  }

  const { chapter, questionIndexInChapter } = found;
  const question = chapter.questions[questionIndexInChapter];

  return (
    <>
      {/* フッター固定時の被り防止に余白を確保 */}
      <div style={{ marginBottom: "4rem" }}>
        <QuizClient
          question={question}                   // 現在の問題データ
          questionNumber={questionNumber}       // 問題番号（0始まり）
          totalQuestions={totalQuestions}       // 全問題数
          chapterTitle={chapter.title}           // 章タイトル
          chapterIntro={chapter.intro}           // 章説明文
        />
      </div>
      {/* フッターを画面下に固定したい場合はここで <FooterFixed /> を追加可能 */}
    </>
  );
}
