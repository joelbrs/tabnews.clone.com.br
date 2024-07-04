import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

export function MenuActions({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: Function;
}): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <div className="border rounded-lg p-1 bg-slate-100 dark:text-black">
          <MoreHorizontal className="w-4 h-4 hover:cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative sm:left-20 w-48 rounded-xl">
        <DropdownMenuItem
          onClick={() => {
            onClick();
          }}
          className="hover:cursor-pointer"
        >
          {children}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
