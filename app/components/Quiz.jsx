"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizStartButton() {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleStartQuiz = () => {
    router.push("/quiz/1");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        onClick={handleStartQuiz}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: isHover ? "var(--accent-hover)" : "var(--accent)",
          color: "white",
          border: "none",
          transition: "background-color 0.3s ease",
        }}
      >
        ミッション開始！
      </button>
    </div>
  );
}
