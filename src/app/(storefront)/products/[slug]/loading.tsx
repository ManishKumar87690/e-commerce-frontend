import { Skeleton } from "@/components/ui/skeleton";
export default function ProductDetailLoading() {
  return (
    <div className="container py-8">
      <div className="flex gap-2 mb-6">{[80,100,120,150].map((w,i) => <Skeleton key={i} className="h-4" style={{width:`${w}px`}} />)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-3"><Skeleton className="aspect-square rounded-lg" /><div className="flex gap-2">{Array.from({length:4}).map((_,i) => <Skeleton key={i} className="w-16 h-16 rounded-md" />)}</div></div>
        <div className="space-y-4"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-40" /><Skeleton className="h-10 w-40" /><Skeleton className="h-20 w-full" /><div className="flex gap-3"><Skeleton className="h-10 w-32" /><Skeleton className="h-10 flex-1" /></div></div>
      </div>
    </div>
  );
}
