"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, MapPin, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { addressSchema, type AddressInput } from "@/schemas/address.schema";
import { useToast } from "@/hooks/use-toast";
import type { Address } from "@/types/user";

const MOCK_ADDRESSES: Address[] = [
  { id: "addr-1", userId: "user-2", fullName: "John Doe", phone: "+1 555 000 0001", addressLine1: "123 Main Street", city: "New York", state: "NY", postalCode: "10001", country: "US", isDefault: true },
];

export function AddressManager() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AddressInput>({ resolver: zodResolver(addressSchema), defaultValues: { fullName: "", phone: "", addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "US", isDefault: false } });

  const openNew = () => { form.reset({ fullName: "", phone: "", addressLine1: "", city: "", state: "", postalCode: "", country: "US", isDefault: false }); setEditingAddress(null); setDialogOpen(true); };
  const openEdit = (address: Address) => { setEditingAddress(address); form.reset({ fullName: address.fullName, phone: address.phone, addressLine1: address.addressLine1, addressLine2: address.addressLine2 ?? "", city: address.city, state: address.state, postalCode: address.postalCode, country: address.country, isDefault: address.isDefault }); setDialogOpen(true); };

  const onSubmit = (values: AddressInput) => {
    if (editingAddress) {
      setAddresses((prev) => prev.map((a) => { if (a.id === editingAddress.id) return { ...a, ...values }; if (values.isDefault) return { ...a, isDefault: false }; return a; }));
      toast({ description: "Address updated." });
    } else {
      const newAddress: Address = { ...values, id: `addr-${Date.now()}`, userId: "user-2" };
      setAddresses((prev) => values.isDefault ? [newAddress, ...prev.map((a) => ({ ...a, isDefault: false }))] : [...prev, newAddress]);
      toast({ description: "Address added." });
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {addresses.length === 0 && <div className="text-center py-8 text-muted-foreground border rounded-lg"><MapPin className="h-8 w-8 mx-auto mb-2 opacity-40" /><p className="text-sm">No addresses saved yet.</p></div>}
      {addresses.map((address) => (
        <div key={address.id} className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2"><p className="font-medium text-sm">{address.fullName}</p>{address.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}</div>
              <p className="text-sm text-muted-foreground">{address.phone}</p>
              <p className="text-sm text-muted-foreground">{address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}</p>
              <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.postalCode}, {address.country}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(address)}><Pencil className="h-3.5 w-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(address.id)} disabled={address.isDefault}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          {!address.isDefault && <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5" onClick={() => { setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === address.id }))); toast({ description: "Default address updated." }); }}><Check className="h-3 w-3" />Set as default</Button>}
        </div>
      ))}
      <Button variant="outline" className="w-full gap-2" onClick={openNew}><Plus className="h-4 w-4" />Add new address</Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Full name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Phone number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="addressLine1" render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Address line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="postalCode" render={({ field }) => (<FormItem><FormLabel>Postal code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="isDefault" render={({ field }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal text-sm cursor-pointer">Set as default address</FormLabel></FormItem>)} />
              <div className="flex gap-3 pt-2"><Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit" className="flex-1">{editingAddress ? "Update" : "Save address"}</Button></div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Remove address?</AlertDialogTitle><AlertDialogDescription>This address will be permanently deleted from your account.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setAddresses((prev) => prev.filter((a) => a.id !== deleteId)); setDeleteId(null); toast({ description: "Address removed." }); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
