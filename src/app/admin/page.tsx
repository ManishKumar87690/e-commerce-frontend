import type { Metadata } from "next";
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Admin Dashboard" };

const STATS = [
  { label: "Total Revenue", value: formatPrice(48291), change: "+12.5%", trend: "up" as const, icon: DollarSign },
  { label: "Total Orders", value: "1,284", change: "+8.2%", trend: "up" as const, icon: ShoppingBag },
  { label: "Total Customers", value: "892", change: "+4.1%", trend: "up" as const, icon: Users },
  { label: "Products", value: "97", change: "-2.3%", trend: "down" as const, icon: Package },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-muted-foreground mt-1">Welcome back. Here&apos;s what&apos;s happening.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(({ label, value, change, trend, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full"><Icon className="h-4 w-4 text-primary" /></div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className={cn("text-xs flex items-center gap-1 mt-1", trend === "up" ? "text-green-600" : "text-red-500")}>
                {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card><CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader><CardContent><div className="text-sm text-muted-foreground text-center py-8">Connect to your backend to see live order data.</div></CardContent></Card>
    </div>
  );
}
