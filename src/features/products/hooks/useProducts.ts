import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/client";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { PaginatedResponse } from "@/types/api";
import type { Product, ProductListParams } from "@/types/product";
import { API } from "@/lib/api/endpoints";

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.products(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params) Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== null) searchParams.set(key, String(value)); });
      return apiGet<PaginatedResponse<Product>>(`${API.products}?${searchParams.toString()}`);
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.product(slug),
    queryFn: () => apiGet<{ data: Product }>(`${API.products}/slug/${slug}`),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}
