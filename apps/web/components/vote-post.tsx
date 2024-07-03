import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@repo/ui/components";

export interface Props {
  post: any;
}

export default function VotePost({ post }: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-1 sm:max-w-[50vw]">
      <Button variant="ghost" className="p-2" title="Achei relevante">
        <ChevronUp className="text-muted-foreground w-4 h-4" />
      </Button>
      <span className="text-blue-500 font-medium text-sm">
        {post?.tabcoins}
      </span>
      <Button variant="ghost" className="p-2" title="Não achei relevante">
        <ChevronDown className="text-muted-foreground w-4 h-4" />
      </Button>
    </div>
  );
}
