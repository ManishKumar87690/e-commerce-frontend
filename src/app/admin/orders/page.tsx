import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { Search } from "lucide-react";

export const metadata: Metadata = { title: "Admin – Orders" };

const MOCK_ORDERS = [
  { id: "ord-001", orderNumber: "ORD-1H8K2M-XP", customerName: "John Doe", status: "shipped", paymentStatus: "paid", total: 1078.92, createdAt: "2024-06-15T10:00:00Z" },
  { id: "ord-002", orderNumber: "ORD-2B9L4N-QR", customerName: "Jane Smith", status: "delivered", paymentStatus: "paid", total: 156.59, createdAt: "2024-06-10T08:30:00Z" },
  { id: "ord-003", orderNumber: "ORD-3C0M6P-ST", customerName: "Bob Wilson", status: "pending", paymentStatus: "pending", total: 387.71, createdAt: "2024-06-20T14:00:00Z" },
];

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Orders</h1><p className="text-sm text-muted-foreground">{MOCK_ORDERS.length} total orders</p></div>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search orders or customers..." className="pl-9 h-9" />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Payment</TableHead><TableHead className="text-right">Total</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-medium">{order.orderNumber}</TableCell>
                <TableCell className="text-sm">{order.customerName}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(order.createdAt, "MMM d, yyyy")}</TableCell>
                <TableCell><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLOR[order.status] ?? ""}`}>{order.status}</span></TableCell>
                <TableCell><Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"} className="text-xs capitalize">{order.paymentStatus}</Badge></TableCell>
                <TableCell className="text-right font-medium text-sm">{formatPrice(order.total)}</TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-8 w-8" asChild><Link href={ROUTES.orderDetail(order.id)}><Eye className="h-3.5 w-3.5" /></Link></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
