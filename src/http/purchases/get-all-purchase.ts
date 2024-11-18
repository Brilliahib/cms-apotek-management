import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Purchase } from "@/types/purchase/purchase";

interface GetAllPurchaseResponse {
  data: Purchase[];
}

export const GetAllPurchaseHandler = async (
  token: string
): Promise<GetAllPurchaseResponse> => {
  const { data } = await api.get<GetAllPurchaseResponse>("/purchases", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllPurchase = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllPurchaseResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["purchase-list"],
    queryFn: () => GetAllPurchaseHandler(token),
    ...options,
  });
};
