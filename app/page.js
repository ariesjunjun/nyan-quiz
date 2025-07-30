import Quiz from "./components/Quiz";
import Image from 'next/image';
import FooterFixed from "./components/FooterFixed";

export default function Home() {
  return (
    <>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  }}
>
  <div
    style={{
      width: "80vw",
      maxWidth: "300px",
      aspectRatio: "1 / 1", // 正方形にする
      borderRadius: "50%",
      backgroundColor: "white",
      overflow: "hidden", // はみ出た部分を隠す
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      src="/hogoneko_top.jpg"
      alt="クイズのメイン画像"
      width={300}
  height={300}
      style={{
        objectFit: "contain", // 切れずに全体表示
        transform: "scale(0.75)", // ← ここで画像だけ小さくする
      }}
    />
  </div>
</div>

      <Quiz />

       {/* TOPページだけ固定フッター */}
       <FooterFixed />
    </>
  );
}
