"use client";
import { useState } from "react";
import { Save, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { cn } from "@/lib/cn";

interface InventoryRow { productId: string; productName: string; variantId: string; sku: string; attributes: Record<string, string>; stock: number; newStock: number | null; }

export default function AdminInventoryPage() {
  const { toast } = useToast();
  const initialRows: InventoryRow[] = MOCK_PRODUCTS.flatMap((product) => product.variants.map((variant) => ({ productId: product.id, productName: product.name, variantId: variant.id, sku: variant.sku, attributes: variant.attributes, stock: variant.stock, newStock: null })));
  const [rows, setRows] = useState(initialRows);
  const [hasChanges, setHasChanges] = useState(false);

  const updateStock = (variantId: string, value: string) => { const parsed = parseInt(value, 10); setRows((prev) => prev.map((r) => r.variantId === variantId ? { ...r, newStock: isNaN(parsed) ? null : Math.max(0, parsed) } : r)); setHasChanges(true); };
  const saveAll = () => { setRows((prev) => prev.map((r) => ({ ...r, stock: r.newStock !== null ? r.newStock : r.stock, newStock: null }))); setHasChanges(false); toast({ description: "Inventory updated successfully." }); };

  const lowStockRows = rows.filter((r) => (r.newStock ?? r.stock) <= 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Inventory</h1><p className="text-sm text-muted-foreground">{rows.length} variants · {lowStockRows.length} low stock</p></div>
        {hasChanges && <Button onClick={saveAll} className="gap-2"><Save className="h-4 w-4" />Save Changes</Button>}
      </div>
      {lowStockRows.length > 0 && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900 p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
          <p className="text-sm text-orange-700 dark:text-orange-400">{lowStockRows.length} variant{lowStockRows.length !== 1 ? "s are" : " is"} low on stock or out of stock.</p>
        </div>
      )}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>SKU</TableHead><TableHead>Attributes</TableHead><TableHead>Current Stock</TableHead><TableHead>Update Stock</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((row) => {
              const effectiveStock = row.newStock !== null ? row.newStock : row.stock;
              const stockStatus = effectiveStock === 0 ? "out_of_stock" : effectiveStock <= 5 ? "low_stock" : "in_stock";
              return (
                <TableRow key={row.variantId}>
                  <TableCell className="font-medium text-sm">{row.productName}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{row.sku}</TableCell>
                  <TableCell><div className="flex flex-wrap gap-1">{Object.entries(row.attributes).map(([k, v]) => <Badge key={k} variant="outline" className="text-xs capitalize">{v}</Badge>)}</div></TableCell>
                  <TableCell className="text-sm">{row.stock}</TableCell>
                  <TableCell><Input type="number" min={0} className="w-24 h-8 text-sm" placeholder={String(row.stock)} value={row.newStock !== null ? row.newStock : ""} onChange={(e) => updateStock(row.variantId, e.target.value)} /></TableCell>
                  <TableCell><span className={cn("text-xs font-medium", stockStatus === "out_of_stock" ? "text-destructive" : stockStatus === "low_stock" ? "text-orange-500" : "text-green-600")}>{stockStatus === "out_of_stock" ? "Out of stock" : stockStatus === "low_stock" ? "Low stock" : "In stock"}</span></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
