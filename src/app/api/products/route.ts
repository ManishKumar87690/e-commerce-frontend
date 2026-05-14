import { NextResponse } from "next/server";
import { getMockProducts } from "@/lib/mock/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const search = searchParams.get("search") ?? undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const products = getMockProducts({ category, search, featured, limit });
    return NextResponse.json({ data: products, meta: { total: products.length, page: 1, limit, totalPages: 1, hasNext: false, hasPrev: false }, success: true });
  } catch {
    return NextResponse.json({ message: "Failed to fetch products.", success: false }, { status: 500 });
  }
}
