"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /><span className="sr-only">Open menu</span></Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col gap-6 mt-6">
          <Link href={ROUTES.home} className="font-bold text-xl text-primary" onClick={() => setOpen(false)}>Storefront</Link>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium py-2 border-b last:border-0 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>{link.label}</Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" onClick={() => setOpen(false)}><Link href={ROUTES.login}>Sign in</Link></Button>
            <Button asChild onClick={() => setOpen(false)}><Link href={ROUTES.register}>Create account</Link></Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
