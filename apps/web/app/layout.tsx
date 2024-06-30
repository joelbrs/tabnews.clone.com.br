import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { UnloggedHeader } from "../components";
import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "../relay";

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
      <RelayEnvironmentProvider environment={environment}>
        <body>
          <UnloggedHeader />
          {children}
        </body>
      </RelayEnvironmentProvider>
    </html>
  );
}
