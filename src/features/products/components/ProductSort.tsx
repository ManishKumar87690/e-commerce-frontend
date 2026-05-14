"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "newest";
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value); params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <Select value={currentSort} onValueChange={handleChange}>
      <SelectTrigger className="w-44 h-9 text-sm"><SelectValue /></SelectTrigger>
      <SelectContent>{SORT_OPTIONS.map((opt) => <SelectItem key={opt.value} value={opt.value} className="text-sm">{opt.label}</SelectItem>)}</SelectContent>
    </Select>
  );
}
