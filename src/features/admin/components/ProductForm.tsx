"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productSchema, type ProductInput } from "@/schemas/product.schema";
import { MOCK_CATEGORIES, MOCK_BRANDS } from "@/lib/mock/products";
import { slugify, wait } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";

interface ProductFormProps { defaultValues?: Partial<ProductInput>; productId?: string; }

export function ProductForm({ defaultValues, productId }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!productId;

  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", slug: "", description: "", shortDescription: "", images: [""], categoryId: "", brandId: "", tags: [], status: "draft", featured: false, variants: [{ sku: "", price: 0, compareAtPrice: null, stock: 0, attributes: {} }], seo: { title: "", description: "" }, ...defaultValues },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({ control: form.control, name: "variants" });
  const tags = form.watch("tags");
  const watchedName = form.watch("name");

  const handleNameBlur = () => { if (!isEditing && watchedName && !form.getValues("slug")) form.setValue("slug", slugify(watchedName)); };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !tags.includes(tag)) form.setValue("tags", [...tags, tag]);
      setTagInput("");
    }
  };

  const onSubmit = async (values: ProductInput) => {
    setIsLoading(true);
    await wait(1000);
    toast({ title: isEditing ? "Product updated" : "Product created", description: `${values.name} has been ${isEditing ? "updated" : "created"} successfully.` });
    router.push(ROUTES.adminProducts);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Product name</FormLabel><FormControl><Input {...field} onBlur={handleNameBlur} placeholder="e.g. Air Max 270" /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>URL slug</FormLabel><FormControl><Input {...field} placeholder="auto-generated-from-name" /></FormControl><FormDescription className="text-xs">Used in the product URL</FormDescription><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form.control} name="shortDescription" render={({ field }) => (<FormItem><FormLabel>Short description <span className="text-muted-foreground text-xs">(optional)</span></FormLabel><FormControl><Input {...field} placeholder="Brief tagline" maxLength={300} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Full description</FormLabel><FormControl><Textarea {...field} placeholder="Detailed product description..." className="min-h-28 resize-y" /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="categoryId" render={({ field }) => (
                <FormItem><FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                    <SelectContent>{MOCK_CATEGORIES.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="brandId" render={({ field }) => (
                <FormItem><FormLabel>Brand <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger></FormControl>
                    <SelectContent>{MOCK_BRANDS.map((brand) => <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-1.5 mb-2">{tags.map((tag) => (<Badge key={tag} variant="secondary" className="gap-1">{tag}<button type="button" onClick={() => form.setValue("tags", tags.filter((t) => t !== tag))} className="ml-1 hover:text-destructive">×</button></Badge>))}</div>
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="Type a tag and press Enter" className="text-sm" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Product Images</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {form.watch("images").map((_, index) => (
              <FormField key={index} control={form.control} name={`images.${index}` as `images.${number}`} render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl><Input {...field} placeholder={`Image URL ${index + 1}`} type="url" /></FormControl>
                    {index > 0 && <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-destructive hover:text-destructive" onClick={() => { const imgs = form.getValues("images"); form.setValue("images", imgs.filter((_, i) => i !== index)); }}><Trash2 className="h-4 w-4" /></Button>}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
            ))}
            <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => form.setValue("images", [...form.getValues("images"), ""])}><Plus className="h-4 w-4" />Add image URL</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Variants</CardTitle>
            <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => appendVariant({ sku: "", price: 0, compareAtPrice: null, stock: 0, attributes: {} })}><Plus className="h-4 w-4" />Add variant</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {variantFields.map((field, index) => (
              <div key={field.id} className="rounded-lg border p-4 space-y-4 relative">
                {variantFields.length > 1 && <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeVariant(index)}><Trash2 className="h-3.5 w-3.5" /></Button>}
                <p className="font-medium text-sm text-muted-foreground">Variant {index + 1}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <FormField control={form.control} name={`variants.${index}.sku`} render={({ field }) => (<FormItem className="col-span-2 sm:col-span-1"><FormLabel>SKU</FormLabel><FormControl><Input {...field} placeholder="SKU-001" /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`variants.${index}.price`} render={({ field }) => (<FormItem><FormLabel>Price ($)</FormLabel><FormControl><Input type="number" min={0} step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`variants.${index}.compareAtPrice`} render={({ field }) => (<FormItem><FormLabel>Compare at ($)</FormLabel><FormControl><Input type="number" min={0} step="0.01" placeholder="Original" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`variants.${index}.stock`} render={({ field }) => (<FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" min={0} {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Status & Visibility</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent>
                  </Select>
                  <FormDescription className="text-xs">Only active products appear in the storefront.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="featured" render={({ field }) => (
                <FormItem className="flex flex-col justify-end"><FormLabel>Featured product</FormLabel>
                  <div className="flex items-center gap-3"><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl><span className="text-sm text-muted-foreground">{field.value ? "Shown on homepage" : "Not featured"}</span></div>
                </FormItem>
              )} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">SEO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="seo.title" render={({ field }) => (<FormItem><FormLabel>SEO title <span className="text-muted-foreground text-xs">(max 60 chars)</span></FormLabel><FormControl><Input {...field} maxLength={60} placeholder="Defaults to product name" /></FormControl><FormDescription className="text-xs">{(field.value?.length ?? 0)}/60</FormDescription><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="seo.description" render={({ field }) => (<FormItem><FormLabel>SEO description <span className="text-muted-foreground text-xs">(max 160 chars)</span></FormLabel><FormControl><Textarea {...field} maxLength={160} placeholder="Brief description for search engines" className="resize-none" rows={2} /></FormControl><FormDescription className="text-xs">{(field.value?.length ?? 0)}/160</FormDescription><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={isLoading} className="min-w-32">{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{isEditing ? "Update Product" : "Create Product"}</Button>
          <Button type="button" variant="outline" onClick={() => router.push(ROUTES.adminProducts)}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}
