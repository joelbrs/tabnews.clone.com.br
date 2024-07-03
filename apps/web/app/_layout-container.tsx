"use client";

import { ThemeProvider } from "next-themes";
import { HeaderProvider } from "../components";
import { Toaster } from "@repo/ui/components";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <HeaderProvider />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
