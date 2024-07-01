"use client";

import "@repo/ui/styles.css";
import { RelayContainer } from "../relay";
import { ThemeProvider, UnloggedHeader } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <RelayContainer>
        <body>
          <ThemeProvider defaultTheme="dark">
            <UnloggedHeader />
            {children}
          </ThemeProvider>
        </body>
      </RelayContainer>
    </html>
  );
}
