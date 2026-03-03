import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Share your feedback — POP",
  description: "Your feedback helps us make POP better. Quick, friendly chat — no long forms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
