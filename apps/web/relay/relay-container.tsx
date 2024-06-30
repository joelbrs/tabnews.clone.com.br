"use client";

import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "./environments";

export default function RelayContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
