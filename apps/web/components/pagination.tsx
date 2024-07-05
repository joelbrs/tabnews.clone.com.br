import { Button } from "@repo/ui/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Pagination {
  page: number;
  hasNextPage: boolean;
}

interface Props {
  pagination: Pagination;
  onPreviousPage: Function;
  onNextPage: Function;
  disabled?: boolean;
}

export default function PaginationField({
  pagination,
  onNextPage,
  onPreviousPage,
  disabled: disabledProp,
}: Props): JSX.Element {
  const disabled = {
    previous: disabledProp || pagination.page === 0,
    next: disabledProp || !pagination.hasNextPage,
  };

  return (
    <div className="flex items-center pt-5 justify-center gap-2">
      <Button
        variant="ghost"
        className={`flex items-center hover:bg-transparent ${!disabled.previous ? "text-blue-700 hover:text-blue-700 hover:underline" : ""}`}
        disabled={disabled.previous}
        onClick={() => onPreviousPage(pagination.page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>
      <Button
        variant="ghost"
        className={`flex items-center hover:bg-transparent ${!disabled.next ? "text-blue-700 hover:text-blue-700 hover:underline" : ""}`}
        onClick={() => onNextPage(pagination.page + 1)}
        disabled={disabled.next}
      >
        Próximo
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
