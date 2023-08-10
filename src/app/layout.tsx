import "../styles/globals.css";
import "../styles/code-block.css";
import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import Layout from "./components/layout/Layout";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raj Alam",
  description: "Home page portofolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
