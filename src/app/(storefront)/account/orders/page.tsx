import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/format";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "My Orders" };

const MOCK_ORDERS = [
  { id: "ord-001", orderNumber: "ORD-1H8K2M-XP", status: "delivered", total: 322.92, createdAt: "2024-05-15T10:00:00Z", itemCount: 1 },
  { id: "ord-002", orderNumber: "ORD-2B9L4N-QR", status: "shipped", total: 156.59, createdAt: "2024-06-10T08:30:00Z", itemCount: 2 },
];

const STATUS_BADGE: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary", confirmed: "default", processing: "default",
  shipped: "default", delivered: "outline", cancelled: "destructive", refunded: "destructive",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {MOCK_ORDERS.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>You haven&apos;t placed any orders yet.</p>
          <Button asChild className="mt-4"><Link href={ROUTES.products}>Start Shopping</Link></Button>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><p className="font-mono font-semibold text-sm">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p></div>
                <Badge variant={STATUS_BADGE[order.status] ?? "default"} className="capitalize">{order.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{order.itemCount} item(s)</p>
                <p className="font-semibold">{formatPrice(order.total)}</p>
              </div>
              <Button variant="outline" size="sm" asChild><Link href={ROUTES.orderDetail(order.id)}>View Details</Link></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
