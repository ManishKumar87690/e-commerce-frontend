import { NextResponse } from "next/server";
export async function GET() {
  const stats = {
    revenue: { total: 48291, changePercent: 12.5, trend: "up" },
    orders: { total: 1284, pending: 23, changePercent: 8.2, trend: "up" },
    customers: { total: 892, newThisMonth: 47, changePercent: 4.1, trend: "up" },
    products: { total: 97, outOfStock: 3, changePercent: -2.3, trend: "down" },
  };
  return NextResponse.json({ data: stats, success: true });
}
