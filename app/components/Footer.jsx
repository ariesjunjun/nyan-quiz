// app/components/Footer.jsx
export default function Footer() {
    return (
      <footer style={
          { padding: "1rem",
            backgroundColor: "var(--main-bg)",
            textAlign: "center",
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
          color: "#fff", }
        }>
        <small>© 2025 保護猫クイズ by ニャンズマーケット</small>
      </footer>
    );
  }
