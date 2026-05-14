import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatPrice } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import type { Order, OrderStatus } from "@/types/order";

export const metadata: Metadata = { title: "Order Details" };

const MOCK_ORDER: Order = {
  id: "ord-001",
  orderNumber: "ORD-1H8K2M-XP",
  userId: "user-1",
  status: "shipped",
  paymentMethod: "card",
  paymentStatus: "paid",
  subtotal: 299,
  shippingCost: 0,
  discount: 0,
  tax: 23.92,
  total: 322.92,
  trackingNumber: "1Z999AA10123456784",
  estimatedDelivery: "2024-07-01T00:00:00Z",
  shippingAddress: {
    fullName: "John Doe",
    phone: "+1 555 000 0001",
    addressLine1: "123 Main Street",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "US",
   },
  items: [
    {
      id: "oi-1",
      orderId: "ord-001",
      productId: "prod-2",
      variantId: "v4",
      productName: "iPhone 15 Pro",
      variantAttributes: { color: "natural titanium", storage: "128GB" },
      sku: "IP15P-NAT-128",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200",
      quantity: 1,
      unitPrice: 999,
      total: 999,
    },
  ],
  createdAt: "2024-06-15T10:00:00Z",
  updatedAt: "2024-06-18T10:00:00Z",
};

const STATUS_STEPS: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const STATUS_ORDER: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered"];

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = MOCK_ORDER.id === id ? MOCK_ORDER : null;
  if (!order) notFound();
  const currentStepIndex = STATUS_ORDER.indexOf(order.status);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href={ROUTES.orders}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="font-mono text-sm text-muted-foreground">{order.orderNumber}</p>
        </div>
      </div>
      {/* Status Timeline */}
      {order.status !== "cancelled" && order.status !== "refunded" && (
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 font-semibold">Order Status</h2>
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-muted" />
            <div
              className="absolute left-0 top-4 h-0.5 bg-primary transition-all"
              style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
            />
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const Icon = step.icon;
              return (
                <div key={step.status} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${isCompleted ? "border-primary bg-primary" : "border-muted bg-background"}`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isCompleted ? "text-primary-foreground" : "text-muted-foreground"}`}
                    />
                  </div>
                  <span
                    className={`max-w-[60px] text-center text-xs ${isCompleted ? "font-medium text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          {order.trackingNumber && (
            <div className="mt-4 border-t pt-4 text-sm">
              <span className="text-muted-foreground">Tracking: </span>
              <span className="font-mono">{order.trackingNumber}</span>
            </div>
          )}
          {order.estimatedDelivery && (
            <div className="mt-1 text-sm">
              <span className="text-muted-foreground">Est. delivery: </span>
              <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
            </div>
          )}
        </div>
      )}
      {/* Items */}
      <div className="space-y-4 rounded-lg border bg-card p-6">
        <h2 className="font-semibold">Items Ordered</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.productName}</p>
              <div className="mt-0.5 flex flex-wrap gap-1">
                {Object.entries(item.variantAttributes).map(([k, v]) => (
                  <span key={k} className="text-xs capitalize text-muted-foreground">
                    {v}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-medium">{formatPrice(item.total)}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Summary */}
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="mb-2 font-semibold">Order Summary</h2>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatPrice(order.tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
