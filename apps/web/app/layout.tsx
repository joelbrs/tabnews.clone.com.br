import "@repo/ui/styles.css";
import type { Metadata } from "next";
import RelayContainer from "../relay/relay-container";
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
      <RelayContainer>
        <body>
          <UnloggedHeader />
          {children}
        </body>
      </RelayContainer>
    </html>
  );
}
