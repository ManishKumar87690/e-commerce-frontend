import type { Metadata } from "next";
import { AddressManager } from "@/features/auth/components/AddressManager";

export const metadata: Metadata = { title: "My Addresses" };

export default function AddressesPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-bold">Saved Addresses</h1><p className="text-muted-foreground text-sm mt-1">Manage your delivery addresses</p></div>
      <AddressManager />
    </div>
  );
}
