"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MOCK_BRANDS } from "@/lib/mock/products";
import { slugify } from "@/lib/utils";
import type { Brand } from "@/types/product";

const brandSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  logo: z.string().url().optional().or(z.literal("")),
});
type BrandInput = z.infer<typeof brandSchema>;

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(MOCK_BRANDS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const { toast } = useToast();
  const form = useForm<BrandInput>({ resolver: zodResolver(brandSchema), defaultValues: { name: "", slug: "", description: "", logo: "" } });
  const watchedName = form.watch("name");

  const openNew = () => { form.reset({ name: "", slug: "", description: "", logo: "" }); setEditingBrand(null); setDialogOpen(true); };
  const openEdit = (b: Brand) => { setEditingBrand(b); form.reset({ name: b.name, slug: b.slug, description: b.description ?? "", logo: b.logo ?? "" }); setDialogOpen(true); };

  const onSubmit = (values: BrandInput) => {
    if (editingBrand) {
      setBrands((prev) => prev.map((b) => b.id === editingBrand.id ? { ...b, ...values, logo: values.logo || undefined } : b));
      toast({ description: "Brand updated." });
    } else {
      setBrands((prev) => [...prev, { id: `brand-${Date.now()}`, name: values.name, slug: values.slug, description: values.description, logo: values.logo || undefined }]);
      toast({ description: "Brand created." });
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Brands</h1><p className="text-sm text-muted-foreground">{brands.length} brands</p></div>
        <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Add Brand</Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium text-sm">{brand.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{brand.slug}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{brand.description ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(brand)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { setBrands((prev) => prev.filter((b) => b.id !== brand.id)); toast({ description: "Brand deleted." }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingBrand ? "Edit Brand" : "New Brand"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} onBlur={() => { if (!editingBrand && watchedName && !form.getValues("slug")) form.setValue("slug", slugify(watchedName)); }} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description <span className="text-xs text-muted-foreground">(optional)</span></FormLabel><FormControl><Textarea {...field} rows={2} className="resize-none" /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="logo" render={({ field }) => (<FormItem><FormLabel>Logo URL <span className="text-xs text-muted-foreground">(optional)</span></FormLabel><FormControl><Input {...field} type="url" placeholder="https://..." /></FormControl><FormMessage /></FormItem>)} />
              <div className="flex gap-3"><Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit" className="flex-1">{editingBrand ? "Update" : "Create"}</Button></div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
