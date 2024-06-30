"use client";

import { Input } from "@repo/ui/components";
import { Search } from "lucide-react";
import { useState } from "react";

export function InputSearch(): JSX.Element {
  const [model, setModel] = useState<string | undefined>();

  return (
    <div className="flex w-full max-w-sm items-center border rounded-md pl-2">
      <Search className="size-5 text-muted-foreground" />
      <Input
        className="h-8 bg-transparent border-none"
        onChange={($event) => {
          setModel($event.target.value);
        }}
        placeholder="Pesquisar..."
        value={model}
      />
    </div>
  );
}
