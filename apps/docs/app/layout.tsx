import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miint Docs | Documentation",
  description: "Documentation for Miint applications and tools.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
