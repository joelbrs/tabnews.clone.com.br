"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@repo/ui/components";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  onConfirm: Function;
  loading?: boolean;
};

export function DialogConfirm({
  description,
  onConfirm,
  children,
  title,
  loading,
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:min-h-[130px] sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={loading && isLoading} asChild>
            <Button className="h-8" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              setIsLoading(true);
              onConfirm();
              setIsLoading(false);
            }}
            className="h-8"
            variant="outline"
            disabled={loading && isLoading}
          >
            {loading && isLoading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
