import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "保護猫譲渡大作戦 by ニャンズマーケット ",
  description: "保護猫について楽しく学べるクイズアプリ",
  icons: {
    icon: "/favicon.ico", // public直下のファイル
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
