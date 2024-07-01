"use client";

import { Input } from "@repo/ui/components";
import { Search } from "lucide-react";
import { useState } from "react";

export function InputSearch(): JSX.Element {
  const [model, setModel] = useState<string | undefined>();

  return (
    <div className="flex w-full max-w-sm items-center md:border rounded-md pl-2">
      <Search className="md:size-5 size-4 text-muted-foreground text-white" />
      <Input
        className="h-8 bg-transparent border-none hidden md:flex"
        onChange={($event) => {
          setModel($event.target.value);
        }}
        placeholder="Pesquisar..."
        value={model}
      />
    </div>
  );
}
