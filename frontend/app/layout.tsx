import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { InnerLayout } from "./inner-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        style={{
          display: "flex",
          maxWidth: "min(100vw, 500px)",
          minHeight: "100vh",
          margin: "auto",
          border: "1px solid grey",
        }}
      >
        <InnerLayout>{children}</InnerLayout>
      </body>
    </html>
  );
}
