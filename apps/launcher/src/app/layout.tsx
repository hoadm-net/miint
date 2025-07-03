import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miint Launcher | Simple Tools",
  description: "Miint toolbox – a collection of simple but effective tools including password generator and more.",
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
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
