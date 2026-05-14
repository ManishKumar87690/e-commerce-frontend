"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Unhandled error:", error); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center gap-6">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground max-w-sm">An unexpected error occurred. We&apos;ve been notified and are looking into it.</p>
        {error.digest && <p className="text-xs text-muted-foreground font-mono">Error ID: {error.digest}</p>}
      </div>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" className="gap-2"><RefreshCw className="h-4 w-4" />Try again</Button>
        <Button asChild><Link href="/" className="gap-2"><Home className="h-4 w-4" />Go home</Link></Button>
      </div>
    </div>
  );
}
