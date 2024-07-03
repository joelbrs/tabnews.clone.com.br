import "@repo/ui/styles.css";
import "@toast-ui/editor/toastui-editor.css";
import "@toast-ui/editor/toastui-editor-viewer.css";
import "react-tabs/style/react-tabs.css";
import { RelayContainer } from "../relay";
import LayoutContainer from "./_layout-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TabNews: Conteúdos para quem trabalha com programação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <RelayContainer>
        <body className="font-sans">
          <LayoutContainer>{children}</LayoutContainer>
        </body>
      </RelayContainer>
    </html>
  );
}
