import apiClient from "../apiClient";
import { Product } from "../types/Product";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async (product: Product) =>
      (
        await apiClient.post<{ message: string; product: Product }>(
          "/api/products",
          product
        )
      ).data,
  });

export const useEditProductMutation = () =>
  useMutation({
    mutationFn: async (product: Product) =>
      (
        await apiClient.put<{ message: string; product: Product }>(
          `/api/products/${product._id}`,
          product
        )
      ).data,
  });

export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: async (id: string) => {
      (await apiClient.delete<{ message: string }>(`api/products/${id}`)).data;
    },
  });
