import { NextResponse } from "next/server";
import { getMockProductBySlug } from "@/lib/mock/products";
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getMockProductBySlug(slug);
  if (!product) return NextResponse.json({ message: "Product not found.", success: false }, { status: 404 });
  return NextResponse.json({ data: product, success: true });
}
