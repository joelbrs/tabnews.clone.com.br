import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

export function MenuActions({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <div className="border rounded-lg p-1 bg-slate-100 dark:text-black">
          <MoreHorizontal className="w-4 h-4 hover:cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative sm:left-20 w-48 rounded-xl">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
