"use client";

import "@repo/ui/styles.css";
import { RelayContainer } from "../relay";
import { UnloggedHeader } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <RelayContainer>
        <body>
          <UnloggedHeader />
          {children}
        </body>
      </RelayContainer>
    </html>
  );
}
