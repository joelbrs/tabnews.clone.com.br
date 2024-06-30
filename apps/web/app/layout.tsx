import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { UnloggedHeader } from "../components";

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
      <body>
        <UnloggedHeader />
        {children}
      </body>
    </html>
  );
}
