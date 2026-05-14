import type { Metadata } from "next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/format";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin – Customers" };

const MOCK_CUSTOMERS = [
  { id: "user-1", name: "Admin User", email: "admin@storefront.com", role: "admin", orderCount: 0, totalSpent: 0, createdAt: "2024-01-01T00:00:00Z" },
  { id: "user-2", name: "John Doe", email: "john@example.com", role: "customer", orderCount: 3, totalSpent: 1558.43, createdAt: "2024-02-10T00:00:00Z" },
  { id: "user-3", name: "Jane Smith", email: "jane@example.com", role: "customer", orderCount: 7, totalSpent: 892.15, createdAt: "2024-03-15T00:00:00Z" },
  { id: "user-4", name: "Bob Wilson", email: "bob@example.com", role: "customer", orderCount: 1, totalSpent: 387.71, createdAt: "2024-06-01T00:00:00Z" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Customers</h1><p className="text-sm text-muted-foreground">{MOCK_CUSTOMERS.length} registered users</p></div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search customers..." className="pl-9 h-9" /></div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Role</TableHead><TableHead>Orders</TableHead><TableHead>Total Spent</TableHead><TableHead>Joined</TableHead></TableRow></TableHeader>
          <TableBody>
            {MOCK_CUSTOMERS.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{getInitials(customer.name)}</AvatarFallback></Avatar>
                    <div><p className="font-medium text-sm">{customer.name}</p><p className="text-xs text-muted-foreground">{customer.email}</p></div>
                  </div>
                </TableCell>
                <TableCell><Badge variant={customer.role === "admin" ? "default" : "secondary"} className="capitalize text-xs">{customer.role}</Badge></TableCell>
                <TableCell className="text-sm">{customer.orderCount}</TableCell>
                <TableCell className="text-sm font-medium">{formatPrice(customer.totalSpent)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(customer.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
