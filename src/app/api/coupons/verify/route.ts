import { NextResponse } from "next/server";
import { z } from "zod";
const MOCK_COUPONS: Record<string, number> = { SAVE10: 10, SAVE15: 15, SAVE50: 50, WELCOME20: 20 };
const bodySchema = z.object({ code: z.string().min(1) });
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = bodySchema.parse(body);
    const discount = MOCK_COUPONS[code.toUpperCase()];
    if (!discount) return NextResponse.json({ message: "Invalid or expired coupon code." }, { status: 400 });
    return NextResponse.json({ discount, code: code.toUpperCase() });
  } catch {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
