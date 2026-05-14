"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tag, Award, Ticket, ShoppingBag, Users, Warehouse, Star, ChevronRight, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { APP_CONFIG } from "@/constants/config";

const NAV_ITEMS = [
  { label: "Dashboard", href: ROUTES.admin, icon: LayoutDashboard, exact: true },
  { label: "Products", href: ROUTES.adminProducts, icon: Package },
  { label: "Categories", href: ROUTES.adminCategories, icon: Tag },
  { label: "Brands", href: ROUTES.adminBrands, icon: Award },
  { label: "Coupons", href: ROUTES.adminCoupons, icon: Ticket },
  { label: "Orders", href: ROUTES.adminOrders, icon: ShoppingBag },
  { label: "Customers", href: ROUTES.adminCustomers, icon: Users },
  { label: "Inventory", href: ROUTES.adminInventory, icon: Warehouse },
  { label: "Reviews", href: ROUTES.adminReviews, icon: Star },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r bg-card flex flex-col">
      <div className="p-6 border-b"><Link href={ROUTES.admin} className="font-bold text-lg text-primary">{APP_CONFIG.name}</Link><p className="text-xs text-muted-foreground mt-0.5">Admin Panel</p></div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors", isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <Icon className="h-4 w-4 shrink-0" />{label}{isActive && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={() => signOut({ callbackUrl: "/" })}><LogOut className="h-4 w-4" />Sign out</Button>
      </div>
    </aside>
  );
}
