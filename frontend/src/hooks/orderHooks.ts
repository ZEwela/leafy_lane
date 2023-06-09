import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem, ShippingAddress } from "../types/Cart";
import apiClient from "../apiClient";
import { Order } from "../types/Order";

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ["orderHistory"],
    queryFn: async () =>
      (await apiClient.get<Order[]>("/api/orders/history")).data,
  });

export const useGetPayPalClientIdQuery = () =>
  useQuery({
    queryKey: ["paypalClientId"],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>("/api/keys/paypal")).data,
  });

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `/api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  });

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          "/api/orders",
          order
        )
      ).data,
  });
