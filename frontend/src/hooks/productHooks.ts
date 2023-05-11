import apiClient from "../apiClient";
import { Product } from "../types/Product";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${slug}`)).data,
  });

export const useGetProductDetailsByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/product/${id}`)).data,
  });
