// app/components/FooterFixed.jsx

// フッターを常に画面下部に固定表示するコンポーネント
export default function FooterFixed() {
  return (
    <footer
      style={{
        padding: "1rem", // 上下に余白を追加して見やすく
        backgroundColor: "var(--main-bg)", // カスタムCSS変数で背景色を指定
        textAlign: "center", // テキストを中央揃え
        color: "#fff", // 文字色を白に
        position: "fixed", // 常に画面の下に固定
        bottom: 0, // 画面下端に配置
        left: 0, // 画面左端に配置
        width: "100%", // 幅を画面全体に
      }}
    >
      {/* コピーライト表示 */}
      <small>© 2025 保護猫クイズ by ニャンズマーケット</small>
    </footer>
  );
}
