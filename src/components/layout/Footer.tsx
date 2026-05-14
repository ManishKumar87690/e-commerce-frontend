import Link from "next/link";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";

const footerLinks = {
  Shop: [
    { label: "All Products", href: ROUTES.products },
    { label: "New Arrivals", href: `${ROUTES.products}?sort=newest` },
    { label: "Best Sellers", href: `${ROUTES.products}?sort=popular` },
    { label: "Sale", href: `${ROUTES.products}?sort=price_asc` },
  ],
  Account: [
    { label: "My Account", href: ROUTES.account },
    { label: "Orders", href: ROUTES.orders },
    { label: "Wishlist", href: ROUTES.wishlist },
    { label: "Addresses", href: ROUTES.addresses },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-xl text-primary mb-3">{APP_CONFIG.name}</p>
            <p className="text-sm text-muted-foreground max-w-xs">Your one-stop shop for quality products at competitive prices.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-3 text-sm">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
