"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { M_PLUS_Rounded_1c } from 'next/font/google';

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin', 'latin-ext'],  // japanese は存在しないので削除
  weight: ['400', '700'],
});

export default function Header({ onReset }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onReset === "function") onReset();
    router.push("/");
  };

  return (
    <header
      style={{
        padding: "2rem 1rem",
        backgroundColor: "var(--main-bg)",
        textAlign: "center",
        color: "#FFF",
        letterSpacing: "0.05em",
      }}
    >
      <h1
      style={{ margin: "0 0 0.5rem", fontSize: "2rem", fontWeight: "bold" }}
      className={mPlusRounded.className}>
        <Link
          href="/"
          onClick={handleClick}
          style={{
            color: "#FFF",
            textDecoration: "none",
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          保護猫譲渡大作戦！
        </Link>
      </h1>

      <p
      style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}
      className={mPlusRounded.className}>
        <Link
          href="/"
          onClick={handleClick}
          style={{
            color: "#FFEBCD",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          by ニャンズマーケット
        </Link>
      </p>

      <p style={{
        color: "#000",
        fontSize: "1rem",
        margin: 0 }}>
        クイズに答えて保護猫譲渡ミッションをクリアせよ！
      </p>
    </header>
  );
}
