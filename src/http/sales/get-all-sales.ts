import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Sales } from "@/types/sales/sales";

interface GetAllSalesResponse {
  data: Sales[];
}

export const GetAllSalesHandler = async (
  token: string
): Promise<GetAllSalesResponse> => {
  const { data } = await api.get<GetAllSalesResponse>("/sales", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllSales = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllSalesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["sales-list"],
    queryFn: () => GetAllSalesHandler(token),
    ...options,
  });
};
