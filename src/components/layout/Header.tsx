"use client";
import Link from "next/link";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { CartBadge } from "@/features/cart/components/CartBadge";
import { WishlistBadge } from "@/features/wishlist/components/WishlistBadge";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { SearchBar } from "@/features/products/components/SearchBar";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useUIStore } from "@/store/ui.store";
import { ROUTES } from "@/constants/routes";
import { APP_CONFIG } from "@/constants/config";
import { NAV_LINKS } from "@/constants/nav";

export function Header() {
  const { setCartDrawerOpen } = useUIStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Link href={ROUTES.home} className="flex items-center gap-2 font-bold text-xl shrink-0">
          <span className="text-primary">{APP_CONFIG.name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 mx-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>
          ))}
        </nav>
        <div className="flex-1 hidden md:block max-w-sm"><SearchBar /></div>
        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link href={ROUTES.search}><Search className="h-5 w-5" /><span className="sr-only">Search</span></Link>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href={ROUTES.wishlist}><Heart className="h-5 w-5" /><WishlistBadge /><span className="sr-only">Wishlist</span></Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setCartDrawerOpen(true)}>
            <ShoppingCart className="h-5 w-5" /><CartBadge /><span className="sr-only">Cart</span>
          </Button>
          <UserMenu />
          <MobileNav />
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
