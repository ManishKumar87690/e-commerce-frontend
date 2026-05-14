import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePagination({ defaultLimit = 12 }: { defaultLimit?: number } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.max(1, Number(searchParams.get("limit") ?? defaultLimit));
  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);
  const setPage = useCallback((p: number) => updateParam("page", String(p)), [updateParam]);
  return { page, limit, setPage };
}
