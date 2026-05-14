import { Skeleton } from "@/components/ui/skeleton";
export default function AccountLoading() {
  return (
    <div className="container py-8">
      <div className="flex gap-8">
        <aside className="hidden md:block w-48 shrink-0">
          <div className="space-y-1">{Array.from({length:4}).map((_,i) => <Skeleton key={i} className="h-9 rounded-md" />)}</div>
        </aside>
        <div className="flex-1 space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-64" />{Array.from({length:3}).map((_,i) => <Skeleton key={i} className="h-14 rounded-lg" />)}</div>
      </div>
    </div>
  );
}
