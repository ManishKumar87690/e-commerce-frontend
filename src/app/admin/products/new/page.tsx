import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/features/admin/components/ProductForm";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Admin – New Product" };

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild><Link href={ROUTES.adminProducts}><ChevronLeft className="h-4 w-4" /></Link></Button>
        <div><h1 className="text-2xl font-bold">New Product</h1><p className="text-muted-foreground text-sm">Add a new product to your catalog</p></div>
      </div>
      <ProductForm />
    </div>
  );
}
