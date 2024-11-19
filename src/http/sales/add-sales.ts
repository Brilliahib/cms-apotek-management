import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Sales } from "@/types/sales/sales";
import { SaleType } from "@/validators/sale/sale-validator";

interface SaleResponse {
  data: Sales;
}

export const addSaleHandler = async (
  body: SaleType,
  token: string
): Promise<SaleResponse> => {
  const { data } = await api.post("/sales", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddSale = (
  options?: UseMutationOptions<SaleResponse, AxiosError<any>, SaleType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: SaleType) =>
      addSaleHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
