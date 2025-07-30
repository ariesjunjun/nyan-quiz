
import SNSShareButtons from "@/app/components/SNSShareButtons";
import ResultClient from "../../components/ResultClient";
import { Suspense } from "react";
import FooterFixed from "@/app/components/FooterFixed";
import SNSShareWrapper from "@/app/components/SNSShareWrapper";

export default function ResultPage() {
  const title = "この記事をシェアしよう";

  return (
    <>
      <Suspense fallback={<div>読み込み中...</div>}>
      <ResultClient />
    </Suspense>
<hr/>
      <div style={{
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "3rem",
        }}>
        <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        ＼ SNSで結果をシェアしよう ／
        </p>
        <SNSShareWrapper title={title} />
      </div>
      <FooterFixed/>
    </>
  );
}
