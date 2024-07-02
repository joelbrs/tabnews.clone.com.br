"use client";

import "@repo/ui/styles.css";
import "@toast-ui/editor/toastui-editor.css";
import { RelayContainer } from "../relay";
import { HeaderProvider, ThemeProvider } from "../components";

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
            <HeaderProvider />
            {children}
          </ThemeProvider>
        </body>
      </RelayContainer>
    </html>
  );
}
