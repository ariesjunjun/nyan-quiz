// app/components/FooterFixed.jsx
export default function FooterFixed() {
  return (
    <footer
      style={{
        padding: "1rem",
        backgroundColor: "var(--main-bg)",
        textAlign: "center",
        color: "#fff",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <small>© 2025 保護猫クイズ by ニャンズマーケット</small>
    </footer>
  );
}
