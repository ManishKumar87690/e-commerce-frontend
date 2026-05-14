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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MOCK_CATEGORIES } from "@/lib/mock/products";
import { slugify } from "@/lib/utils";
import type { Category } from "@/types/product";

const categoryFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, hyphens"),
  description: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});
type CategoryFormInput = z.infer<typeof categoryFormSchema>;

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<CategoryFormInput>({ resolver: zodResolver(categoryFormSchema), defaultValues: { name: "", slug: "", description: "", image: "" } });
  const watchedName = form.watch("name");

  const openNew = () => { form.reset({ name: "", slug: "", description: "", image: "" }); setEditingCategory(null); setDialogOpen(true); };
  const openEdit = (c: Category) => { setEditingCategory(c); form.reset({ name: c.name, slug: c.slug, description: c.description ?? "", image: c.image ?? "" }); setDialogOpen(true); };

  const onSubmit = (values: CategoryFormInput) => {
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => c.id === editingCategory.id ? { ...c, ...values, image: values.image || undefined } : c));
      toast({ description: "Category updated." });
    } else {
      setCategories((prev) => [...prev, { id: `cat-${Date.now()}`, ...values, image: values.image || undefined, productCount: 0 }]);
      toast({ description: "Category created." });
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Categories</h1><p className="text-sm text-muted-foreground">{categories.length} categories</p></div>
        <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Add Category</Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead>Description</TableHead><TableHead>Products</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-sm">{category.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{category.slug}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{category.description ?? "—"}</TableCell>
                <TableCell className="text-sm">{category.productCount ?? 0}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(category)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(category.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} onBlur={() => { if (!editingCategory && watchedName && !form.getValues("slug")) form.setValue("slug", slugify(watchedName)); }} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description <span className="text-xs text-muted-foreground">(optional)</span></FormLabel><FormControl><Textarea {...field} rows={2} className="resize-none" /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="image" render={({ field }) => (<FormItem><FormLabel>Image URL <span className="text-xs text-muted-foreground">(optional)</span></FormLabel><FormControl><Input {...field} type="url" placeholder="https://..." /></FormControl><FormMessage /></FormItem>)} />
              <div className="flex gap-3"><Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit" className="flex-1">{editingCategory ? "Update" : "Create"}</Button></div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete category?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the category.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setCategories((prev) => prev.filter((c) => c.id !== deleteId)); setDeleteId(null); toast({ description: "Category deleted." }); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
