import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
      <div>
        <h1 className="text-8xl font-bold text-primary/20">404</h1>
        <h2 className="text-2xl font-bold mt-2">Page not found</h2>
        <p className="text-muted-foreground mt-2 max-w-sm">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      </div>
      <div className="flex gap-3">
        <Button asChild><Link href={ROUTES.home}>Go home</Link></Button>
        <Button variant="outline" asChild><Link href={ROUTES.products}>Browse products</Link></Button>
      </div>
    </div>
  );
}
