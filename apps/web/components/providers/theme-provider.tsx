"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): JSX.Element {
  return (
    <NextThemesProvider {...props} defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
}
