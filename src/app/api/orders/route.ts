import { NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = { id: `ord-${Date.now()}`, orderNumber: generateOrderNumber(), status: "pending", ...body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return NextResponse.json({ data: order, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create order.", success: false }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({ data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0, hasNext: false, hasPrev: false }, success: true });
}
