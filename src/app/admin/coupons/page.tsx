"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { formatDate, formatPrice } from "@/lib/format";
import type { Coupon } from "@/types/coupon";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters"),
  type: z.enum(["percentage", "fixed"]),
  value: z.number().positive("Value must be positive"),
  minOrderAmount: z.number().positive().optional(),
  maxUses: z.number().int().positive().optional(),
  expiresAt: z.string().optional(),
  isActive: z.boolean().default(true),
});
type CouponFormInput = z.infer<typeof couponSchema>;

const MOCK_COUPONS: Coupon[] = [
  { id: "c1", code: "SAVE10", type: "fixed", value: 10, usedCount: 23, isActive: true, createdAt: "2024-01-01T00:00:00Z" },
  { id: "c2", code: "WELCOME20", type: "percentage", value: 20, minOrderAmount: 50, maxUses: 100, usedCount: 67, isActive: true, expiresAt: "2024-12-31T00:00:00Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "c3", code: "SAVE50", type: "fixed", value: 50, minOrderAmount: 200, usedCount: 5, isActive: false, createdAt: "2024-03-01T00:00:00Z" },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const { toast } = useToast();
  const form = useForm<CouponFormInput>({ resolver: zodResolver(couponSchema), defaultValues: { code: "", type: "fixed", value: 0, isActive: true } });

  const openNew = () => { form.reset({ code: "", type: "fixed", value: 0, isActive: true }); setEditingCoupon(null); setDialogOpen(true); };
  const openEdit = (c: Coupon) => { setEditingCoupon(c); form.reset({ code: c.code, type: c.type, value: c.value, minOrderAmount: c.minOrderAmount, maxUses: c.maxUses, expiresAt: c.expiresAt ? c.expiresAt.split("T")[0] : "", isActive: c.isActive }); setDialogOpen(true); };

  const onSubmit = (values: CouponFormInput) => {
    if (editingCoupon) {
      setCoupons((prev) => prev.map((c) => c.id === editingCoupon.id ? { ...c, ...values, code: values.code.toUpperCase(), expiresAt: values.expiresAt ? `${values.expiresAt}T00:00:00Z` : undefined } : c));
      toast({ description: "Coupon updated." });
    } else {
      setCoupons((prev) => [{ id: `c-${Date.now()}`, ...values, code: values.code.toUpperCase(), usedCount: 0, expiresAt: values.expiresAt ? `${values.expiresAt}T00:00:00Z` : undefined, createdAt: new Date().toISOString() }, ...prev]);
      toast({ description: "Coupon created." });
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Coupons</h1><p className="text-sm text-muted-foreground">{coupons.length} coupons</p></div>
        <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Add Coupon</Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Type</TableHead><TableHead>Value</TableHead><TableHead>Min. Order</TableHead><TableHead>Used / Max</TableHead><TableHead>Expires</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-mono font-semibold text-sm">{coupon.code}</TableCell>
                <TableCell><Badge variant="outline" className="capitalize text-xs">{coupon.type}</Badge></TableCell>
                <TableCell className="text-sm font-medium">{coupon.type === "percentage" ? `${coupon.value}%` : formatPrice(coupon.value)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{coupon.minOrderAmount ? formatPrice(coupon.minOrderAmount) : "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{coupon.usedCount} / {coupon.maxUses ?? "∞"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{coupon.expiresAt ? formatDate(coupon.expiresAt) : "Never"}</TableCell>
                <TableCell><Switch checked={coupon.isActive} onCheckedChange={() => setCoupons((prev) => prev.map((c) => c.id === coupon.id ? { ...c, isActive: !c.isActive } : c))} className="scale-75" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(coupon)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { setCoupons((prev) => prev.filter((c) => c.id !== coupon.id)); toast({ description: "Coupon deleted." }); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingCoupon ? "Edit Coupon" : "New Coupon"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="code" render={({ field }) => (<FormItem><FormLabel>Code</FormLabel><FormControl><Input {...field} placeholder="SAVE20" onChange={(e) => field.onChange(e.target.value.toUpperCase())} className="uppercase" /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="type" render={({ field }) => (<FormItem><FormLabel>Type</FormLabel><Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="fixed">Fixed ($)</SelectItem><SelectItem value="percentage">Percentage (%)</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="value" render={({ field }) => (<FormItem><FormLabel>Value</FormLabel><FormControl><Input type="number" min={0} step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="minOrderAmount" render={({ field }) => (<FormItem><FormLabel>Min. order ($)</FormLabel><FormControl><Input type="number" min={0} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="maxUses" render={({ field }) => (<FormItem><FormLabel>Max uses</FormLabel><FormControl><Input type="number" min={1} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="expiresAt" render={({ field }) => (<FormItem><FormLabel>Expires</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="isActive" render={({ field }) => (<FormItem className="flex items-center gap-3 space-y-0"><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal">Active (usable by customers)</FormLabel></FormItem>)} />
              <div className="flex gap-3 pt-2"><Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit" className="flex-1">{editingCoupon ? "Update" : "Create"}</Button></div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
