import type { Metadata } from "next";
import "@repo/ui/styles.css";

export const metadata: Metadata = {
  title: "TabNews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
