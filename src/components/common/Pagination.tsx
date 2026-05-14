"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface PaginationProps { page: number; totalPages: number; onPageChange: (page: number) => void; }
export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (page <= 4) return i + 1;
    if (page >= totalPages - 3) return totalPages - 6 + i;
    return page - 3 + i;
  });
  return (
    <div className="flex items-center justify-center gap-1">
      <Button variant="outline" size="icon" onClick={() => onPageChange(page - 1)} disabled={page === 1}><ChevronLeft className="h-4 w-4" /></Button>
      {pages[0] > 1 && <><Button variant="outline" size="icon" onClick={() => onPageChange(1)}>1</Button>{pages[0] > 2 && <span className="px-2 text-muted-foreground">…</span>}</>}
      {pages.map((p) => <Button key={p} variant={p === page ? "default" : "outline"} size="icon" onClick={() => onPageChange(p)}>{p}</Button>)}
      {pages[pages.length - 1] < totalPages && <><span className="px-2 text-muted-foreground">…</span><Button variant="outline" size="icon" onClick={() => onPageChange(totalPages)}>{totalPages}</Button></>}
      <Button variant="outline" size="icon" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}><ChevronRight className="h-4 w-4" /></Button>
    </div>
  );
}
