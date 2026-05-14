"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { MOCK_CATEGORIES } from "@/lib/mock/products";
import { formatPrice } from "@/lib/format";

const PRICE_MAX = 2000;

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) { params.delete(key); } else { params.set(key, value); }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(searchParams.get("maxPrice") ?? PRICE_MAX);
  const activeCategory = searchParams.get("category");
  const inStock = searchParams.get("inStock") === "true";
  const hasFilters = activeCategory || inStock || searchParams.get("minPrice") || searchParams.get("maxPrice");
  const clearAll = () => {
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasFilters && <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 gap-1 text-xs"><X className="h-3 w-3" />Clear all</Button>}
      </div>
      <Separator />
      <div>
        <h4 className="font-medium text-sm mb-3">Category</h4>
        <div className="space-y-2">
          {MOCK_CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox id={`cat-${cat.id}`} checked={activeCategory === cat.slug} onCheckedChange={(checked) => updateParam("category", checked ? cat.slug : null)} />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal cursor-pointer flex justify-between flex-1">
                <span>{cat.name}</span><span className="text-muted-foreground text-xs">{cat.productCount}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="font-medium text-sm mb-3">Price: {formatPrice(minPrice)} – {maxPrice >= PRICE_MAX ? "Any" : formatPrice(maxPrice)}</h4>
        <Slider min={0} max={PRICE_MAX} step={10} value={[minPrice, maxPrice >= PRICE_MAX ? PRICE_MAX : maxPrice]}
          onValueChange={([min, max]) => { updateParam("minPrice", min > 0 ? String(min) : null); updateParam("maxPrice", max < PRICE_MAX ? String(max) : null); }} className="mt-2" />
      </div>
      <Separator />
      <div>
        <h4 className="font-medium text-sm mb-3">Availability</h4>
        <div className="flex items-center gap-2">
          <Checkbox id="in-stock" checked={inStock} onCheckedChange={(checked) => updateParam("inStock", checked ? "true" : null)} />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">In stock only</Label>
        </div>
      </div>
    </aside>
  );
}
