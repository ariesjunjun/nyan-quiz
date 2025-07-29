
import SNSShareButtons from "@/app/components/SNSShareButtons";
import ResultClient from "../../components/ResultClient";
import { Suspense } from "react";

export default function ResultPage() {
  return (
    <>
      <Suspense fallback={<div>読み込み中...</div>}>
      <ResultClient />
    </Suspense>
<hr/>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        ＼ SNSで結果をシェアしよう ／
        </p>
        <SNSShareButtons />
      </div>
    </>
  );
}
