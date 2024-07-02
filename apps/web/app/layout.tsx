"use client";

import "@repo/ui/styles.css";
import "@toast-ui/editor/toastui-editor.css";
import "react-tabs/style/react-tabs.css";
import { RelayContainer } from "../relay";
import { HeaderProvider, ThemeProvider } from "../components";
import { Toaster } from "@repo/ui/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <RelayContainer>
        <body>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <HeaderProvider />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </RelayContainer>
    </html>
  );
}
