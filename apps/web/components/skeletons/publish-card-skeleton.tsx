import { Skeleton } from "@repo/ui/components";

export function PublishCardSkeleton(): JSX.Element {
  const skeletons = Array.from({ length: 10 }, (_, index) => (
    <div className="mt-2" key={index}>
      <div className="space-y-1.5">
        <div className="flex items-start gap-3">
          <Skeleton className="w-[10px] h-3" />
          <Skeleton className="h-3 sm:w-[580px] w-[330px]" />
        </div>
        <div className="flex gap-2 items-center ml-6">
          <Skeleton className="h-2 w-[55px]" />
          <Skeleton className="h-2 w-[55px]" />
          <Skeleton className="h-2 w-[55px]" />
        </div>
      </div>
    </div>
  ));

  return <>{skeletons}</>;
}
