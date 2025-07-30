"use client";

import React from "react";

export default function SNSShareButtons({ url, title }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const lineShare = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;

  // ボタンの共通スタイル
  const baseButtonStyle = {
    display: "inline-block",
    padding: "0.5rem 1.25rem",
    borderRadius: "9999px", // pill shape
    color: "white",
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: "background-color 0.3s ease",
    userSelect: "none",
    cursor: "pointer",
    textAlign: "center",
  };

  // 各SNSのカラー
  const twitterStyle = {
    ...baseButtonStyle,
    backgroundColor: "#1DA1F2",
  };
  const facebookStyle = {
    ...baseButtonStyle,
    backgroundColor: "#3b5998",
  };
  const lineStyle = {
    ...baseButtonStyle,
    backgroundColor: "#00c300",
  };

  return (
    <>
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <a
        href={twitterShare}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitterでシェア"
        style={twitterStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d8ddb")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1DA1F2")}
      >
        Twitter
      </a>
      <a
        href={facebookShare}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebookでシェア"
        style={facebookStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2d4373")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b5998")}
      >
        Facebook
      </a>
      <a
        href={lineShare}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEでシェア"
        style={lineStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#009900")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00c300")}
      >
        LINE
      </a>
    </div>

</>
  );
}
