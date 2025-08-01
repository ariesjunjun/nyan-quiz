// app/components/Footer.jsx

export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem",               // フッター全体に余白を追加（上下左右1rem）
        backgroundColor: "var(--main-bg)", // メインカラーを背景に設定（CSS変数）
        textAlign: "center",          // テキストを中央揃え
        width: "100%",                // 横幅を画面いっぱいに広げる
        color: "#fff",                // 文字色を白にする
      }}
    >
      {/* 著作権表記などを小さく表示 */}
      <small>© 2025 保護猫クイズ by ニャンズマーケット</small>
    </footer>
  );
}
