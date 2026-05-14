import { NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({ productId: z.string(), variantId: z.string(), quantity: z.number().int().positive() });
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return NextResponse.json({ data, success: true, message: "Item added to cart." });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Invalid request.", success: false }, { status: 400 });
    return NextResponse.json({ message: "Server error.", success: false }, { status: 500 });
  }
}
