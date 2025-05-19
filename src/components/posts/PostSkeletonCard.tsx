import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostSkeletonCard = () => {
  return (
    <Card className="flex w-[690px] h-[260px] flex-col md:flex-row p-4 rounded-xl border border-gray-22">
      <Skeleton className="w-full md:w-[300px] h-[180px] rounded-md mb-4 md:mb-0 md:mr-6" />
      <div className="flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          <Skeleton className="w-3/4 h-6 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-5/6 h-4 rounded" />
        </div>
        <div className="flex justify-between mt-6">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
      </div>
    </Card>
  );
};
