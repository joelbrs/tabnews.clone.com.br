"use client";

import "@repo/ui/styles.css";
import { RelayContainer } from "../relay";
import { LoggedHeader, ThemeProvider, UnloggedHeader } from "../components";

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
            {/* <UnloggedHeader /> */}
            <LoggedHeader />
            {children}
          </ThemeProvider>
        </body>
      </RelayContainer>
    </html>
  );
}
