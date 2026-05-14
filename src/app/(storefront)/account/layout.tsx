import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const ACCOUNT_NAV = [
  { label: "Profile", href: ROUTES.profile },
  { label: "Orders", href: ROUTES.orders },
  { label: "Addresses", href: ROUTES.addresses },
  { label: "Wishlist", href: ROUTES.accountWishlist },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8">
      <div className="flex gap-8">
        <aside className="hidden md:block w-48 shrink-0">
          <nav className="flex flex-col gap-1">
            {ACCOUNT_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">{item.label}</Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
