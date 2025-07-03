import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miint | Simple but Effective Apps",
  description: "Miint – open-source collection of simple but effective applications and tools.",
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
