import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/common/RatingStars";
import { formatPrice, getDiscountPercent } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { WishlistToggleButton } from "@/features/wishlist/components/WishlistToggleButton";
import { QuickAddButton } from "@/features/cart/components/QuickAddButton";

interface ProductCardProps { product: Product; priority?: boolean; }

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const discountPercent = product.compareAtPrice ? getDiscountPercent(product.price, product.compareAtPrice) : 0;
  return (
    <div className="group relative flex flex-col rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <Link href={ROUTES.product(product.slug)} className="relative block aspect-square overflow-hidden bg-muted">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" priority={priority} />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercent > 0 && <Badge variant="destructive" className="text-xs font-semibold">-{discountPercent}%</Badge>}
          {product.featured && <Badge className="text-xs bg-amber-500 hover:bg-amber-600">Featured</Badge>}
          {product.stockStatus === "out_of_stock" && <Badge variant="secondary" className="text-xs">Sold out</Badge>}
          {product.stockStatus === "low_stock" && <Badge variant="outline" className="text-xs border-orange-400 text-orange-600">Low stock</Badge>}
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <WishlistToggleButton productId={product.id} size="icon-sm" />
        </div>
      </Link>
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        {product.brand && <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand.name}</p>}
        <Link href={ROUTES.product(product.slug)} className="font-medium text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">{product.name}</Link>
        <RatingStars rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-base">{formatPrice(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>}
          </div>
          <QuickAddButton product={product} />
        </div>
      </div>
    </div>
  );
}
