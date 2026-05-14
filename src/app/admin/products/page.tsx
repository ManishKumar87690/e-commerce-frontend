import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMockProducts } from "@/lib/mock/products";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Admin – Products" };

export default function AdminProductsPage() {
  const products = getMockProducts({ limit: 20 });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Products</h1><p className="text-sm text-muted-foreground">{products.length} products total</p></div>
        <Button asChild><Link href={ROUTES.adminProductNew}><Plus className="mr-2 h-4 w-4" />Add Product</Link></Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead className="w-12" /><TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell><div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted"><Image src={product.images[0]} alt={product.name} fill sizes="40px" className="object-cover" /></div></TableCell>
                <TableCell><div><p className="font-medium text-sm">{product.name}</p><p className="text-xs text-muted-foreground">{product.brand?.name}</p></div></TableCell>
                <TableCell className="text-sm text-muted-foreground">{product.category?.name}</TableCell>
                <TableCell className="text-sm">{formatPrice(product.price)}</TableCell>
                <TableCell className="text-sm">{product.stock}</TableCell>
                <TableCell><Badge variant={product.status === "active" ? "default" : "secondary"} className="capitalize">{product.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild><Link href={ROUTES.adminProductEdit(product.id)}><Pencil className="h-3.5 w-3.5" /></Link></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
