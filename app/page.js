import Quiz from "./components/Quiz";
import Image from 'next/image';
import FooterFixed from "./components/FooterFixed";
import { Topillust } from "./components/Topillust";

export default function Home() {
  return (
    <>

<Quiz />

<Topillust/>


       {/* TOPページだけ固定フッター */}
       <FooterFixed />
    </>
  );
}
