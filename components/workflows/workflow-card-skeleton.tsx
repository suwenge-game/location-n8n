import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkflowCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-2 border-border">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-muted">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>

      {/* Content */}
      <CardContent className="p-5 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
