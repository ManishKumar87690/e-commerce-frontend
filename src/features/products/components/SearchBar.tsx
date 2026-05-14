"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`${ROUTES.search}?q=${encodeURIComponent(query.trim())}`);
  };
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="pl-9 pr-9 h-9" aria-label="Search products" />
      {query && <Button type="button" variant="ghost" size="icon" className="absolute right-1 h-7 w-7" onClick={() => { setQuery(""); inputRef.current?.focus(); }}><X className="h-3.5 w-3.5" /></Button>}
    </form>
  );
}
